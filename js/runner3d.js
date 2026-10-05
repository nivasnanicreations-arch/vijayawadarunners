/**
 * Vijayawada Runners - 3D Interactive Human Runner & Road Engine
 * Built with Three.js (WebGL)
 * Features:
 * - Articulated 3D Human Athletic Character (head, torso, arms, legs, shoes)
 * - True 3D perspective road with moving road dashes & mile markers
 * - Dual athletic Red & Blue dynamic rim-lighting
 * - 3 Speed Modes: Walk, Marathon, Sprint with realistic gait mechanics
 * - Interactive mouse/touch camera rotation
 */

class Runner3DScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') return;

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight || 280;

    // Movement state
    this.speedMode = 'marathon';
    this.speedSettings = {
      walk: { freq: 4.5, stride: 0.5, kneeBend: 0.6, armSwing: 0.6, bounce: 0.08, roadSpeed: 0.15, pace: '6:30 /km', velocity: '9.2 km/h', cadence: '155 SPM' },
      marathon: { freq: 7.5, stride: 0.9, kneeBend: 1.1, armSwing: 0.95, bounce: 0.18, roadSpeed: 0.35, pace: '4:58 /km', velocity: '12.1 km/h', cadence: '178 SPM' },
      sprint: { freq: 11.5, stride: 1.3, kneeBend: 1.5, armSwing: 1.3, bounce: 0.28, roadSpeed: 0.65, pace: '3:20 /km', velocity: '18.0 km/h', cadence: '198 SPM' }
    };

    // Camera orbit interaction
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraAngle = 0.5; // Radians around character
    this.cameraDistance = 8.5;
    this.cameraHeight = 3.2;

    this.initScene();
    this.initRoad();
    this.initCharacter();
    this.initEvents();
    this.animate(0);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a1128, 0.04);

    this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 100);
    this.updateCameraPosition();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Lighting (Athletic Red & Blue Studio Floodlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Sun / Main Key Light
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    sunLight.position.set(5, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    this.scene.add(sunLight);

    // Athletic Red Rim Light
    const redLight = new THREE.PointLight(0xdc2626, 2.5, 20);
    redLight.position.set(-4, 3, -2);
    this.scene.add(redLight);

    // Athletic Royal Blue Rim Light
    const blueLight = new THREE.PointLight(0x1d4ed8, 2.5, 20);
    blueLight.position.set(4, 3, 3);
    this.scene.add(blueLight);
  }

  initRoad() {
    this.roadGroup = new THREE.Group();

    // Road Surface
    const roadGeo = new THREE.PlaneGeometry(6, 60);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.85,
      metalness: 0.1
    });
    this.road = new THREE.Mesh(roadGeo, roadMat);
    this.road.rotation.x = -Math.PI / 2;
    this.road.position.z = 0;
    this.road.receiveShadow = true;
    this.roadGroup.add(this.road);

    // Yellow Dashes (Moving stripes)
    this.roadDashes = [];
    const dashGeo = new THREE.PlaneGeometry(0.25, 2.5);
    const dashMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xca8a04,
      roughness: 0.5
    });

    for (let i = 0; i < 15; i++) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.01, -25 + i * 4);
      dash.receiveShadow = true;
      this.roadGroup.add(dash);
      this.roadDashes.push(dash);
    }

    // Curbs on sides (Red & Blue athletic painted curbs)
    const curbGeo = new THREE.BoxGeometry(0.3, 0.15, 60);
    const curbMatRed = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
    const curbMatBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });

    const leftCurb = new THREE.Mesh(curbGeo, curbMatRed);
    leftCurb.position.set(-3.1, 0.075, 0);
    this.roadGroup.add(leftCurb);

    const rightCurb = new THREE.Mesh(curbGeo, curbMatBlue);
    rightCurb.position.set(3.1, 0.075, 0);
    this.roadGroup.add(rightCurb);

    // Milestone Signs along roadside
    this.milestonePosts = [];
    const createMilestone = (text, zPos, colorHex) => {
      const postGroup = new THREE.Group();
      
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 0.9;
      pole.castShadow = true;
      postGroup.add(pole);

      const boardGeo = new THREE.BoxGeometry(1.4, 0.7, 0.08);
      const boardMat = new THREE.MeshStandardMaterial({ color: colorHex });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.position.y = 1.6;
      board.castShadow = true;
      postGroup.add(board);

      postGroup.position.set(3.6, 0, zPos);
      this.roadGroup.add(postGroup);
      this.milestonePosts.push(postGroup);
    };

    createMilestone('KM 5 Benz Circle', -15, 0x1d4ed8);
    createMilestone('KM 10.5 Barrage', -35, 0xdc2626);
    createMilestone('KM 21.1 Finish', -55, 0x22c55e);

    this.scene.add(this.roadGroup);
  }

  initCharacter() {
    this.character = new THREE.Group();
    this.character.position.set(0, 0, 0);

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xb5734c, roughness: 0.6 });
    const jerseyMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 }); // Athletic Red Singlet
    const shortsMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 }); // Royal Blue Shorts
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }); // Red Running Shoes
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
    const headbandMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });

    // Root Pelvis
    this.pelvis = new THREE.Group();
    this.pelvis.position.y = 1.7;
    this.character.add(this.pelvis);

    // Shorts / Hips
    const hipsGeo = new THREE.CylinderGeometry(0.32, 0.3, 0.35, 12);
    const hips = new THREE.Mesh(hipsGeo, shortsMat);
    hips.castShadow = true;
    this.pelvis.add(hips);

    // Torso / Chest
    this.torsoGroup = new THREE.Group();
    this.torsoGroup.position.y = 0.2;
    this.pelvis.add(this.torsoGroup);

    const chestGeo = new THREE.BoxGeometry(0.65, 0.75, 0.36);
    const chest = new THREE.Mesh(chestGeo, jerseyMat);
    chest.position.y = 0.4;
    chest.castShadow = true;
    this.torsoGroup.add(chest);

    // Race Bib Number on chest
    const bibGeo = new THREE.PlaneGeometry(0.38, 0.28);
    const bibMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const bib = new THREE.Mesh(bibGeo, bibMat);
    bib.position.set(0, 0.42, 0.19);
    this.torsoGroup.add(bib);

    // Blue Racing Stripe on Singlet
    const stripeGeo = new THREE.BoxGeometry(0.1, 0.76, 0.38);
    const stripe = new THREE.Mesh(stripeGeo, shortsMat);
    stripe.position.set(-0.2, 0.4, 0);
    this.torsoGroup.add(stripe);

    // Neck & Head
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 0.85;
    this.torsoGroup.add(this.headGroup);

    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.18, 8);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 0.05;
    this.headGroup.add(neck);

    const headGeo = new THREE.SphereGeometry(0.24, 16, 16);
    headGeo.scale(1, 1.15, 1);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 0.32;
    head.castShadow = true;
    this.headGroup.add(head);

    // Athletic Hair
    const hairGeo = new THREE.SphereGeometry(0.25, 14, 14);
    hairGeo.scale(1.02, 0.7, 1.1);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.46, -0.04);
    this.headGroup.add(hair);

    // Red Headband
    const bandGeo = new THREE.TorusGeometry(0.245, 0.04, 8, 20);
    bandGeo.rotateX(Math.PI / 2);
    const band = new THREE.Mesh(bandGeo, headbandMat);
    band.position.set(0, 0.36, 0);
    this.headGroup.add(band);

    // ARMS
    this.leftArm = this.createArm(skinMat, jerseyMat, 1);
    this.leftArm.position.set(-0.42, 0.7, 0);
    this.torsoGroup.add(this.leftArm);

    this.rightArm = this.createArm(skinMat, jerseyMat, -1);
    this.rightArm.position.set(0.42, 0.7, 0);
    this.torsoGroup.add(this.rightArm);

    // LEGS
    this.leftLeg = this.createLeg(skinMat, shortsMat, shoeMat, trimMat, -0.18);
    this.pelvis.add(this.leftLeg);

    this.rightLeg = this.createLeg(skinMat, shortsMat, shoeMat, trimMat, 0.18);
    this.pelvis.add(this.rightLeg);

    // Soft Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(0.75, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.4
    });
    this.shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowDisc.rotation.x = -Math.PI / 2;
    this.shadowDisc.position.y = 0.02;
    this.character.add(this.shadowDisc);

    this.scene.add(this.character);
  }

  createArm(skinMat, sleeveMat, side) {
    const shoulder = new THREE.Group();

    // Shoulder sleeve
    const sleeveGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
    shoulder.add(sleeve);

    // Upper arm
    const upperGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.42, 8);
    const upperArm = new THREE.Mesh(upperGeo, skinMat);
    upperArm.position.y = -0.22;
    upperArm.castShadow = true;
    shoulder.add(upperArm);

    // Elbow Joint
    const elbow = new THREE.Group();
    elbow.position.y = -0.42;
    shoulder.add(elbow);

    // Forearm
    const foreGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.4, 8);
    const foreArm = new THREE.Mesh(foreGeo, skinMat);
    foreArm.position.y = -0.2;
    foreArm.castShadow = true;
    elbow.add(foreArm);

    // Wristband & Hand
    const bandGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.08, 8);
    const bandMat = new THREE.MeshStandardMaterial({ color: side === 1 ? 0x1d4ed8 : 0xdc2626 });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = -0.34;
    elbow.add(band);

    const handGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const hand = new THREE.Mesh(handGeo, skinMat);
    hand.position.y = -0.44;
    elbow.add(hand);

    // Default 90 degree arm bend for athletic runner
    elbow.rotation.x = -1.5;

    return shoulder;
  }

  createLeg(skinMat, shortsMat, shoeMat, trimMat, xOffset) {
    const hip = new THREE.Group();
    hip.position.set(xOffset, -0.15, 0);

    // Shorts leg cuff
    const cuffGeo = new THREE.CylinderGeometry(0.18, 0.17, 0.28, 8);
    const cuff = new THREE.Mesh(cuffGeo, shortsMat);
    cuff.position.y = -0.12;
    hip.add(cuff);

    // Thigh
    const thighGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.55, 8);
    const thigh = new THREE.Mesh(thighGeo, skinMat);
    thigh.position.y = -0.38;
    thigh.castShadow = true;
    hip.add(thigh);

    // Knee
    const knee = new THREE.Group();
    knee.position.y = -0.65;
    hip.add(knee);

    // Shin
    const shinGeo = new THREE.CylinderGeometry(0.11, 0.085, 0.6, 8);
    const shin = new THREE.Mesh(shinGeo, skinMat);
    shin.position.y = -0.3;
    shin.castShadow = true;
    knee.add(shin);

    // Shoe / Sneaker
    const footGroup = new THREE.Group();
    footGroup.position.set(0, -0.62, 0.05);

    const shoeBody = new THREE.BoxGeometry(0.19, 0.14, 0.44);
    const shoe = new THREE.Mesh(shoeBody, shoeMat);
    shoe.position.set(0, 0.07, 0.08);
    shoe.castShadow = true;
    footGroup.add(shoe);

    // White sole
    const soleGeo = new THREE.BoxGeometry(0.2, 0.05, 0.46);
    const sole = new THREE.Mesh(soleGeo, trimMat);
    sole.position.set(0, 0.02, 0.08);
    footGroup.add(sole);

    knee.add(footGroup);

    hip.kneeRef = knee;
    return hip;
  }

  setSpeedMode(mode) {
    if (this.speedSettings[mode]) {
      this.speedMode = mode;
      const s = this.speedSettings[mode];

      const pEl = document.getElementById('runner-live-pace');
      const vEl = document.getElementById('runner-live-kmh');
      const cEl = document.getElementById('runner-live-cadence');

      if (pEl) pEl.textContent = s.pace;
      if (vEl) vEl.textContent = s.velocity;
      if (cEl) cEl.textContent = s.cadence;
    }
  }

  updateCameraPosition() {
    this.camera.position.x = Math.sin(this.cameraAngle) * this.cameraDistance;
    this.camera.position.z = Math.cos(this.cameraAngle) * this.cameraDistance;
    this.camera.position.y = this.cameraHeight;
    this.camera.lookAt(0, 1.5, 0);
  }

  initEvents() {
    // Window resize
    window.addEventListener('resize', () => {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight || 280;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    });

    // Mouse drag rotation
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      this.cameraAngle -= deltaX * 0.008;
      this.updateCameraPosition();
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile devices
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      this.cameraAngle -= deltaX * 0.008;
      this.updateCameraPosition();
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Speed button click handlers
    const speedButtons = document.querySelectorAll('.btn-pace-speed');
    speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-speed');
        this.setSpeedMode(mode);
      });
    });
  }

  animate(currentTime) {
    requestAnimationFrame((t) => this.animate(t));

    const time = currentTime * 0.001;
    const settings = this.speedSettings[this.speedMode];

    // Gait animation cycle
    const cycle = time * settings.freq;
    const sinCycle = Math.sin(cycle);
    const cosCycle = Math.cos(cycle);

    // Vertical bounce & forward lean
    const bounceY = Math.abs(sinCycle) * settings.bounce;
    this.pelvis.position.y = 1.7 + bounceY;
    this.torsoGroup.rotation.x = 0.12 + (this.speedMode === 'sprint' ? 0.12 : 0);
    this.torsoGroup.rotation.y = sinCycle * 0.12;

    // Head stability
    this.headGroup.rotation.x = -this.torsoGroup.rotation.x * 0.6;
    this.headGroup.rotation.y = -this.torsoGroup.rotation.y * 0.8;

    // Legs: Hip swing & Knee bending
    // Left Leg
    this.leftLeg.rotation.x = sinCycle * settings.stride;
    if (sinCycle < 0) {
      // Leg moving backward -> bend knee
      this.leftLeg.kneeRef.rotation.x = Math.abs(sinCycle) * settings.kneeBend;
    } else {
      // Forward drive
      this.leftLeg.kneeRef.rotation.x = 0.15;
    }

    // Right Leg (opposite phase)
    this.rightLeg.rotation.x = -sinCycle * settings.stride;
    if (-sinCycle < 0) {
      this.rightLeg.kneeRef.rotation.x = Math.abs(-sinCycle) * settings.kneeBend;
    } else {
      this.rightLeg.kneeRef.rotation.x = 0.15;
    }

    // Arms: Oppose leg motion
    this.leftArm.rotation.x = -sinCycle * settings.armSwing;
    this.rightArm.rotation.x = sinCycle * settings.armSwing;

    // Shadow pulse with bounce
    this.shadowDisc.scale.set(1 - bounceY * 0.8, 1 - bounceY * 0.8, 1);

    // Road movement
    this.roadDashes.forEach(dash => {
      dash.position.z += settings.roadSpeed;
      if (dash.position.z > 25) {
        dash.position.z -= 50;
      }
    });

    // Milestone posts movement
    this.milestonePosts.forEach(post => {
      post.position.z += settings.roadSpeed * 0.8;
      if (post.position.z > 15) {
        post.position.z = -55;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('runner-3d-canvas-container');
  if (container) {
    window.runner3D = new Runner3DScene('runner-3d-canvas-container');
  }
});
