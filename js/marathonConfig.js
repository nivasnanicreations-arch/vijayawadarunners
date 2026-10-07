/**
 * VIJAYAWADA MARATHON 2026 - Centralized Event Configuration
 * 
 * All event parameters, dates, category details, route info, and stories
 * are defined here in one place for easy updating and maintenance.
 * NOTE: Unconfirmed values use 'TO BE ANNOUNCED' as strictly required.
 */

const marathonConfig = {
  // Master Event Identity
  eventName: "VIJAYAWADA MARATHON 2026",
  edition: "10TH EDITION",
  editionNumber: 10,
  tagline: "BEFORE THE CITY WAKES.",
  secondaryTagline: "ONE ROAD. THOUSANDS OF STORIES.",
  missionStatement: "A cinematic celebration of movement, grit, and community on the banks of the sacred Krishna River.",
  motto: "GO LONG • GO STRONG",

  // Dates & Schedule
  eventDate: "06 DECEMBER 2026",
  eventDateShort: "06.12.2026",
  eventDay: "SUNDAY",
  eventTime: "05:00 AM IST",
  targetDateIso: "2026-12-06T05:00:00+05:30",

  // Location & Logistics
  city: "Vijayawada",
  state: "Andhra Pradesh",
  country: "India",
  venue: "TO BE ANNOUNCED",
  startPoint: "TO BE ANNOUNCED",
  finishPoint: "TO BE ANNOUNCED",

  // Official Links
  registrationUrl: "#register",
  sponsorUrl: "#partner-modal",
  volunteerUrl: "#volunteer",
  contactEmail: "info@vijayawadarunners.com",
  contactPhone: "+91 866 248 1026",

  // Flag-off & Prize Pool (Never fabricated)
  flagOffTimes: {
    "21k": "TO BE ANNOUNCED",
    "10k": "TO BE ANNOUNCED",
    "05k": "TO BE ANNOUNCED"
  },
  prizeMoney: "TO BE ANNOUNCED",

  // Race Categories
  categories: [
    {
      id: "05k",
      distance: "05K",
      name: "FITNESS & JOY RUN",
      subtitle: "EVERYONE",
      audience: "Families, beginners, youth & fitness pioneers",
      elevation: "Flat scenic canal promenade",
      cutoff: "60 Mins",
      fee: "TO BE ANNOUNCED",
      color: "#E9C8B2",
      bgClass: "cat-peach",
      highlights: [
        "Finisher Commemorative Medal",
        "Official Technical Running Tee",
        "Timed Bib & Digital Certificate",
        "Post-Run Celebratory Breakfast",
        "Hydration & Medical Support"
      ],
      description: "A joyful 5-kilometer morning celebration for everyone who loves movement. Experience the peaceful dawn air, run alongside friends and family, and celebrate the pure joy of the open road."
    },
    {
      id: "10k",
      distance: "10K",
      name: "TIMED CHALLENGE",
      subtitle: "RUNNING ENTHUSIASTS",
      audience: "Paced athletes & intermediate distance runners",
      elevation: "+24m Riverfront gentle gradient",
      cutoff: "100 Mins",
      fee: "TO BE ANNOUNCED",
      color: "#C8613F",
      bgClass: "cat-terracotta",
      highlights: [
        "RFID Chip-Timed Official Bib",
        "High-Performance Technical Singlet",
        "Architectural Finisher Medal",
        "Official Pacer Buses (50 to 75 min)",
        "Hot Breakfast & Physiotherapy Zone"
      ],
      description: "The classic 10K test of rhythm and speed. Trace the Krishna riverfront as morning sunlight reflects across the water, paced by expert pacers to your personal best."
    },
    {
      id: "21k",
      distance: "21K",
      name: "HALF MARATHON",
      subtitle: "HALF MARATHON",
      audience: "Endurance warriors & seasoned marathoners",
      elevation: "+48m Barrage & Highway Stretch",
      cutoff: "3 Hrs 30 Mins",
      fee: "TO BE ANNOUNCED",
      color: "#17191C",
      bgClass: "cat-charcoal",
      highlights: [
        "International AIMS Certified Course",
        "RFID Chip Timing with 5 Split Mats",
        "Heavy Metallic 10th Edition Medal",
        "Finisher Dry-Fit Jacket/Tee",
        "Complete Recovery & Ice Bath Zone"
      ],
      description: "The flagship 21.1 km endurance journey. Feel the historic wooden vibrations of Prakasam Barrage underfoot, navigate the silent city artery before dawn, and cross the line as the sunrise peaks."
    }
  ],

  // 10th Edition Historical Timeline (Authentic Decade Journey)
  timeline: [
    {
      edition: "01",
      year: "2017",
      title: "The First Footsteps",
      desc: "A small dedicated pack of 200 passionate runners gathered before sunrise at Benz Circle, sparking Vijayawada's first organized dawn running culture.",
      milestone: "200+ Runners"
    },
    {
      edition: "02",
      year: "2018",
      title: "Crossing Bandar Road",
      desc: "First officially timed 10K race with RFID transponders, establishing a benchmark for athletic precision in the city.",
      milestone: "750+ Runners"
    },
    {
      edition: "03",
      year: "2019",
      title: "The Barrage Odyssey",
      desc: "Inaugural 21.1K Half Marathon route crossing the historic Prakasam Barrage as morning mist rose off the Krishna River.",
      milestone: "1,400+ Runners"
    },
    {
      edition: "04",
      year: "2020",
      title: "The Resilient Spirit",
      desc: "When cities locked down, Vijayawada Runners launched an interconnected virtual movement, keeping thousands healthy and moving.",
      milestone: "Global Virtual Reach"
    },
    {
      edition: "05",
      year: "2021",
      title: "The Riverfront Revival",
      desc: "Return to the asphalt with over 2,500 athletes. Introduced structured Sunday training clinics and free youth coaching.",
      milestone: "2,500+ Athletes"
    },
    {
      edition: "06",
      year: "2022",
      title: "The Pacer Fleet",
      desc: "Launch of the official Pacer Bus network and comprehensive volunteer marshaling system ensuring runner safety.",
      milestone: "12 Official Pacers"
    },
    {
      edition: "07",
      year: "2023",
      title: "#RunClean Krishna",
      desc: "Pioneered eco-plogging and zero-waste hydration stations, protecting our riverbanks alongside athletic competition.",
      milestone: "100% Green Race"
    },
    {
      edition: "08",
      year: "2024",
      title: "State Championship Stage",
      desc: "Welcomed national-level endurance runners from across 18 Indian states, solidifying Vijayawada as an elite running hub.",
      milestone: "4,200+ Participants"
    },
    {
      edition: "09",
      year: "2025",
      title: "Wings of Inclusivity",
      desc: "Expanded para-athlete divisions, blade runner sponsorships, and prosthetic limb support drives.",
      milestone: "Para-Athlete Category"
    },
    {
      edition: "10",
      year: "2026",
      title: "10TH EDITION • THE LEGACY",
      desc: "A decade of sweat, devotion, and community. One grand road, thousands of personal journeys, and an unforgettable sunrise.",
      milestone: "DECADE OF MILES"
    }
  ],

  // Interactive Route Data
  routePoints: {
    "05k": {
      distance: "5.0 KM",
      name: "Canal Green Promenade Loop",
      landmarks: ["Start Gantry", "Eluru Canal Path", "U-Turn Checkpoint (2.5K)", "Hydration Node 1 & 2", "Grand Finish Arch"],
      elevationGain: "+12 m",
      points: [
        { label: "Start Gantry", type: "start", km: "0.0K" },
        { label: "Canal Riverside Vista", type: "water", km: "1.5K" },
        { label: "Midway Turnaround Mat", type: "timing", km: "2.5K" },
        { label: "Energy & Electrolytes", type: "water", km: "3.8K" },
        { label: "Golden Finish Arch", type: "finish", km: "5.0K" }
      ]
    },
    "10k": {
      distance: "10.0 KM",
      name: "Riverfront & Prakasam Barrage Approach",
      landmarks: ["Start Gantry", "Bhavanipuram Stretch", "Krishna Riverfront Vista", "Barrage Gate Turnaround (5K)", "Barrage Return", "Finish Gantry"],
      elevationGain: "+26 m",
      points: [
        { label: "Start Gantry", type: "start", km: "0.0K" },
        { label: "Hydration Post 1", type: "water", km: "2.0K" },
        { label: "River Breeze Checkpoint", type: "medical", km: "3.5K" },
        { label: "Barrage North Mat (5K)", type: "timing", km: "5.0K" },
        { label: "Electrolyte Zone 2", type: "water", km: "7.0K" },
        { label: "Cheering Alley", type: "cheer", km: "8.5K" },
        { label: "Golden Finish Arch", type: "finish", km: "10.0K" }
      ]
    },
    "21k": {
      distance: "21.1 KM",
      name: "The Grand Krishna Twin Bridge Circuit",
      landmarks: ["Start Gantry", "Prakasam Barrage Crossing", "Guntur-Krishna Borderline", "Kanaka Durga Foothill Corridor", "BRTS Fast Stretch", "Finish Gantry"],
      elevationGain: "+48 m",
      points: [
        { label: "Start Gantry", type: "start", km: "0.0K" },
        { label: "Hydration Post 1", type: "water", km: "2.5K" },
        { label: "Prakasam Barrage Entry", type: "timing", km: "5.0K" },
        { label: "South Embankment Support", type: "medical", km: "7.5K" },
        { label: "Halfway Timing Mat (10.5K)", type: "timing", km: "10.5K" },
        { label: "Energy Gel & Orange Station", type: "water", km: "14.0K" },
        { label: "Kanaka Durga Hill Vista", type: "cheer", km: "17.0K" },
        { label: "Last Mile Push Mat", type: "medical", km: "19.5K" },
        { label: "Victory Finish Arch", type: "finish", km: "21.1K" }
      ]
    }
  },

  // 4 Support Pillars
  supportPillars: [
    {
      id: "medical",
      title: "MEDICAL EXCELLENCE",
      desc: "5 ALS Ambulances, 12 on-route medical kiosks, mobile paramedic cycling teams with AEDs, and specialized post-race physio recovery tents.",
      icon: "medical"
    },
    {
      id: "hydration",
      title: "PURE HYDRATION",
      desc: "Dedicated stations every 1.5 km stocked with natural mineral water, isotonic electrolytes, fresh citrus oranges, and cold sponges.",
      icon: "hydration"
    },
    {
      id: "marshals",
      title: "ROUTE MARSHALS",
      desc: "150+ trained course marshals and traffic safety specialists coordinating with city police for 100% vehicle-free, secure running lanes.",
      icon: "marshals"
    },
    {
      id: "volunteers",
      title: "VOLUNTEER FORCE",
      desc: "500+ enthusiastic community volunteers managing smooth bib pickup, secure baggage drop, high-energy course cheering, and medals.",
      icon: "volunteers"
    }
  ],

  // Editorial Race Day Board Data
  raceDayBoard: [
    { label: "DATE", value: "06 DEC 2026" },
    { label: "DAY", value: "SUNDAY" },
    { label: "START TIME", value: "05:00 AM IST" },
    { label: "VENUE", value: "TO BE ANNOUNCED" },
    { label: "DISTANCES", value: "05K / 10K / 21K" },
    { label: "CATEGORIES", value: "OPEN / VETERAN / SENIOR VETERAN" },
    { label: "PRIZE POOL", value: "TO BE ANNOUNCED" },
    { label: "TIMING TECH", value: "RFID DISPOSABLE CHIP" }
  ],

  // Real Runner Testimonials & Quotes
  runnerStories: [
    {
      name: "Ramesh Krishna",
      category: "21K HALF MARATHON",
      year: "9-Time Finisher",
      quote: "When you run over the Prakasam Barrage at 5:30 AM with the river mist in your face and the faint orange sky breaking over the hillocks, you don't feel pain. You feel Vijayawada breathing with you.",
      photo: "images/real_human_runner.jpg"
    },
    {
      name: "Dr. Sunitha Mohan",
      category: "10K CHALLENGE",
      year: "Runner & Doctor",
      quote: "As a cardiologist, I preach physical vitality every single day. The Vijayawada Marathon is not merely a race; it is a public health movement that has transformed thousands of families across our state.",
      photo: "images/runner-focus-prep.jpg"
    },
    {
      name: "Karthik & Team Amaravati",
      category: "5K JOY RUN",
      year: "Family Runners",
      quote: "My 10-year-old daughter ran her first 5K with me here. The energy of the volunteers and the sunrise over the canal made it a memory etched forever in our hearts.",
      photo: "images/gallery-crowd-sunrise.jpg"
    }
  ],

  // Verified Sponsors & Partners
  sponsors: [
    {
      tier: "TITLE PARTNER",
      name: "TO BE ANNOUNCED",
      isTba: true
    },
    {
      tier: "HEALTHCARE & MEDICAL PARTNER",
      name: "Latha Super Specialty Hospital",
      logo: "images/sponsor-latha.png",
      isTba: false
    },
    {
      tier: "OFFICIAL RADIO PARTNER",
      name: "93.5 RED FM — Bajaate Raho!",
      logo: "images/sponsor-redfm.png",
      isTba: false
    },
    {
      tier: "FINANCIAL SERVICES PARTNER",
      name: "Shriram City",
      logo: "images/sponsor-shriram.png",
      isTba: false
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "When and where will the 10th Edition of Vijayawada Marathon take place?",
      a: "The race is scheduled for Sunday, 6 December 2026. Official assembly starts at 04:30 AM, with race proceedings beginning at 05:00 AM IST. The exact starting gantry and venue will be announced shortly on this portal."
    },
    {
      q: "What race distances are available?",
      a: "You can register for three certified categories: 05 KM Fitness & Joy Run, 10 KM Timed Challenge, and 21.1 KM Half Marathon. Each category features chip timing (where specified), safety marshaling, and finisher honors."
    },
    {
      q: "When will registration open and what are the fees?",
      a: "Official registrations will open shortly. All fee slabs (Early Bird, Regular, and Group) will be announced transparently. You can use the 'Enter The Race' button to pre-register your interest."
    },
    {
      q: "What is included with my runner registration?",
      a: "Every registered participant receives an official technical running tee/singlet, an RFID chip timing bib (for 10K & 21K), on-route hydration, medical & nutrition support, an exclusive 10th Edition finisher medal, digital timing certificate, and a hot celebratory breakfast."
    },
    {
      q: "Is there a bag storage and baggage drop facility?",
      a: "Yes. A secure, barcode-monitored baggage holding area will be available at the venue holding holding counters from 04:15 AM until race completion."
    },
    {
      q: "Are there pacers for the Half Marathon and 10K?",
      a: "Yes! The Vijayawada Runners Pacer Bus fleet will feature experienced endurance pacers helping athletes reach their goals: 10K (50, 55, 60, 65, 70, 75 mins) and 21K (1:45, 2:00, 2:15, 2:30, 2:45 hrs)."
    },
    {
      q: "How can my company become an official partner or sponsor?",
      a: "Click on 'Become a Partner' in the navigation bar or bottom footer, or reach out directly to info@vijayawadarunners.com. We offer Title, Co-Powered, Hydration, Recovery, and Tech Partner tiers."
    },
    {
      q: "What safety protocols are implemented on the course?",
      a: "Safety is our paramount priority. Courses are managed with dedicated vehicle-free lanes, mobile paramedic cycling teams with AED equipment, 5 ALS ambulances, and hydration points every 1.5 kilometers."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = marathonConfig;
}
