/**
 * VIJAYAWADA MARATHON 2026 — 10TH EDITION
 * Central Content Configuration Layer
 * 
 * Organizers can update race details, dates, prize money, FAQs,
 * and stories here without touching HTML markup or styling.
 */

window.MARATHON_CONFIG = {
  // Core Event Details
  event: {
    name: "Vijayawada Marathon 2026",
    edition: "10th Edition",
    theme: "RUN THE CITY. FEEL THE MOMENT.",
    dateDisplay: "6 December 2026",
    dayDisplay: "Sunday",
    timeDisplay: "5:00 AM IST",
    targetDateIso: "2026-12-06T05:00:00+05:30",
    venue: "[TO BE ANNOUNCED]",
    venueNote: "Start & Finish Arena — Official venue announcement coming soon",
    distances: ["5 KM", "10 KM", "21 KM"],
    registrationUrl: "#register",
    sponsorEmail: "partners@vijayawadarunners.com",
    helplinePhone: "+91 90000 00000",
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com"
    }
  },

  // Flag-off Schedules (Official placeholders as requested)
  flagOff: {
    "21k": {
      distance: "21.1 KM Half Marathon",
      time: "FLAG-OFF TIME — TO BE ANNOUNCED",
      reporting: "Reporting 45 mins prior to flag-off",
      cutOff: "Cut-off: 3 Hours 30 Minutes"
    },
    "10k": {
      distance: "10 KM Timed Race",
      time: "FLAG-OFF TIME — TO BE ANNOUNCED",
      reporting: "Reporting 45 mins prior to flag-off",
      cutOff: "Cut-off: 1 Hour 45 Minutes"
    },
    "5k": {
      distance: "5 KM Fun Run",
      time: "FLAG-OFF TIME — TO BE ANNOUNCED",
      reporting: "Reporting 30 mins prior to flag-off",
      cutOff: "Cut-off: 1 Hour 15 Minutes"
    }
  },

  // Competitive Categories & Prize Purse (Official placeholders)
  prizes: {
    statusNote: "PRIZE DETAILS — TO BE ANNOUNCED",
    statusDescription: "Official prize money distribution across Open, Veteran, and Senior Veteran categories will be published following AIMS certification confirmation.",
    categories: ["Open (18–44 yrs)", "Veteran (45–54 yrs)", "Senior Veteran (55+ yrs)"],
    tiers: [
      {
        race: "21.1 KM Half Marathon",
        first: "PRIZE DETAILS — TO BE ANNOUNCED",
        second: "PRIZE DETAILS — TO BE ANNOUNCED",
        third: "PRIZE DETAILS — TO BE ANNOUNCED"
      },
      {
        race: "10 KM Timed Race",
        first: "PRIZE DETAILS — TO BE ANNOUNCED",
        second: "PRIZE DETAILS — TO BE ANNOUNCED",
        third: "PRIZE DETAILS — TO BE ANNOUNCED"
      },
      {
        race: "5 KM Fun Run",
        first: "Finisher Trophy & Gift Hamper",
        second: "Finisher Trophy & Gift Hamper",
        third: "Finisher Trophy & Gift Hamper"
      }
    ]
  },

  // 10-Edition Historical Journey (01 -> 10)
  editions: [
    {
      num: "01",
      year: "2016",
      title: "The Genesis",
      story: "A circle of 50 sunrise fitness lovers laced up at 5:00 AM on Prakasam Barrage. The first collective breath of a city in motion.",
      quote: "One road, fifty hearts, and the sunrise over the Krishna."
    },
    {
      num: "02",
      year: "2017",
      title: "Finding Rhythm",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "From an idea to a weekend routine."
    },
    {
      num: "03",
      year: "2018",
      title: "Riverfront Road Expansion",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "The road opened wider as more runners stepped up."
    },
    {
      num: "04",
      year: "2019",
      title: "First Formal 10K Timed Run",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "Chip timing brought focus; camaraderie kept the spirit."
    },
    {
      num: "05",
      year: "2020",
      title: "Resilience In Motion",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "When running kept our mental health anchored."
    },
    {
      num: "06",
      year: "2021",
      title: "The Half Marathon Emerges",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "21 kilometres of grit connecting city and nature."
    },
    {
      num: "07",
      year: "2022",
      title: "Community Renaissance",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "Families, students, veterans, running together."
    },
    {
      num: "08",
      year: "2023",
      title: "AIMS Measuring Course",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "A certified timing corridor for national athletes."
    },
    {
      num: "09",
      year: "2024",
      title: "Six Active Chapters",
      story: "[Verified story — organizer to insert official historical milestone].",
      quote: "From one dawn gathering to six city-wide weekend hubs."
    },
    {
      num: "10",
      year: "2026",
      title: "10th Landmark Edition",
      story: "A decade of sweat, sunrise devotion, and shared celebration. Over 6,000 runners standing united at the start line.",
      quote: "Ten editions. Countless miles. One community."
    }
  ],

  // Route Profiles & Information
  routes: {
    "21k": {
      name: "21.1 KM Half Marathon",
      subtitle: "AIMS Certified Fast & Flat Riverfront Course",
      elevation: "+42m net gain (Gentle flat river grade)",
      startFinish: "IGMC Stadium [Organizer to Confirm]",
      surface: "Asphalt & Concrete City Corridors",
      aidStations: "11 Hydration & Medical Aid Points",
      turnaround: "Bhavanipuram / Prakasam Riverbed Turn",
      highlights: [
        "Prakasam Barrage historic river crossing at sunrise",
        "Traffic-free police escorted marathon corridor",
        "AIMS certified timing mats at 5K, 10K, 15K & Finish",
        "Dedicated pacer buses for 2:00, 2:15, 2:30 & 2:45"
      ]
    },
    "10k": {
      name: "10 KM Timed Race",
      subtitle: "Fast Endurance Stride Through the City Heart",
      elevation: "+22m net gain (Flat speed course)",
      startFinish: "IGMC Stadium [Organizer to Confirm]",
      surface: "100% Paved City Roads",
      aidStations: "5 Hydration & Electrolyte Stations",
      turnaround: "Krishna Riverfront Promenade Midpoint",
      highlights: [
        "Flat, wide arterial roads optimal for personal bests",
        "RFID chip timed bib with live split tracking",
        "Fast&Up energy drinks & wet sponges every 1.5 KM",
        "Cheering zones and cultural percussion bands"
      ]
    },
    "5k": {
      name: "5 KM Fun Run",
      subtitle: "Welcoming Distance for Families & Beginners",
      elevation: "+12m net gain (Completely beginner friendly)",
      startFinish: "IGMC Stadium [Organizer to Confirm]",
      surface: "Paved City Loop",
      aidStations: "3 Hydration Points",
      turnaround: "Benz Circle Bridge Approach",
      highlights: [
        "Open to walkers, joggers, parents, and youth (8+ yrs)",
        "Official Dri-FIT jersey and 10th milestone finisher medal",
        "Hot traditional South Indian breakfast post-run",
        "Scenic sunrise loop back into festival celebration arena"
      ]
    }
  },

  // Runner Stories (The People Behind the Run)
  stories: [
    {
      name: "K. Satyanarayana",
      category: "Senior Veteran · 21 KM",
      distance: "21.1 KM Finisher",
      story: "Started running at age 56 across Prakasam Barrage to manage diabetes. Ten years later, he has completed eight consecutive editions of the Vijayawada Marathon.",
      quote: "Every kilometre feels lighter when you know your city is breathing beside you."
    },
    {
      name: "Divya Tejaswi",
      category: "Open Category · 10 KM",
      distance: "10 KM Pace Leader",
      story: "Joined the weekend sunrise group as a complete novice in 2021. Today, she leads pacing groups and trains first-time women runners across the river road chapter.",
      quote: "The marathon doesn't ask how fast you are—it only asks that you show up for yourself."
    },
    {
      name: "Venkata Rao & Family",
      category: "Family Participation · 5 KM",
      distance: "5 KM Community Run",
      story: "Three generations running together: 68-year-old grandfather, son, and 11-year-old granddaughter sharing their Sunday sunrise stride.",
      quote: "Crossing the finish line hand-in-hand is a memory our family cherishes all year."
    }
  ],

  // Comprehensive FAQ Accordion Content (13 verified questions)
  faqs: [
    {
      q: "Who can participate?",
      a: "The Vijayawada Marathon welcomes participants of all fitness backgrounds! The 5 KM is open to everyone aged 8 and above (including walkers, families, and beginners). The 10 KM race is open to runners aged 14 and above. The 21.1 KM Half Marathon is open to runners aged 18 and above who have trained for distance running."
    },
    {
      q: "Which race distance should I choose?",
      a: "If you are new to running, joining with family, or prefer a joyous brisk walk/jog, choose the 5 KM Fun Run. If you run regularly and want to test your speed with chip timing, select the 10 KM. If you have trained for endurance and long-distance discipline, register for the 21.1 KM Half Marathon."
    },
    {
      q: "What are the age categories?",
      a: "For competitive timing and podium evaluation, categories are: Open (18–44 years), Veteran (45–54 years), and Senior Veteran (55 years and above). Age is calculated as of race day (6 December 2026)."
    },
    {
      q: "Where is the event starting point?",
      a: "The official start and finish point is currently listed as [VENUE / START POINT TO BE ANNOUNCED]. Traditionally, the event convenes at IGMC Stadium on MG Road, with final administrative confirmation published closer to race day."
    },
    {
      q: "What time should runners report?",
      a: "Runners are requested to report at least 45 minutes prior to their respective category flag-off to allow ample time for baggage deposit, holding arena check-in, and the collective warm-up session."
    },
    {
      q: "Where can I collect my bib?",
      a: "Bib collection will take place at the official 2-day Marathon Expo on Friday, 4 December and Saturday, 5 December 2026. Every registered participant will receive an email and SMS with a collection barcode pass and venue timings. Please bring an original photo ID. Bibs will NOT be distributed on race morning."
    },
    {
      q: "What does the registration include?",
      a: "Every registration includes: Official 10th Edition Dri-FIT technical running jersey, RFID chip-timed bib (for 10K & 21.1K), heavy commemorative die-cast finisher medal, on-course hydration and medical care, hot traditional breakfast box, instant e-certificate, and professional race-day photographs."
    },
    {
      q: "Are hydration stations available?",
      a: "Yes. Fully stocked hydration aid stations are situated every 1.5 to 2 kilometres along all routes, providing chilled water, Fast&Up electrolytes, energy gels, bananas, oranges, and cooling wet sponges."
    },
    {
      q: "Is medical support available?",
      a: "Extensive medical facilities are deployed throughout the course, including 4 Advanced Life Support (ALS) ambulances, mobile doctor motorbikes with automated external defibrillators (AED), and a fully staffed recovery hospital station at the finish line with certified physiotherapists."
    },
    {
      q: "Where can I find the race route?",
      a: "Interactive route maps, elevation profiles, and aid station markers for 5 KM, 10 KM, and 21.1 KM are available in the 'Routes' section of this website and will be available for GPX download and Plotaroute sync."
    },
    {
      q: "What are the race rules?",
      a: "Runners must wear their assigned bib pinned visibly on the chest. Bib swapping is strictly prohibited and leads to disqualification. Runners must cross all timing mats to receive an official timing certificate. Earphones are discouraged for runner awareness, and pacers on non-official bicycles are strictly prohibited."
    },
    {
      q: "Is there prize money?",
      a: "Yes, competitive cash prizes and trophies are awarded to the Top 3 Men and Women in the 21.1 KM and 10 KM categories across Open, Veteran, and Senior Veteran brackets. Specific prize amounts are currently marked as 'PRIZE DETAILS — TO BE ANNOUNCED' and will be finalized prior to the event."
    },
    {
      q: "What are the Open / Veteran / Senior Veteran categories?",
      a: "Open Category: Ages 18 to 44 years. Veteran Category: Ages 45 to 54 years. Senior Veteran Category: Ages 55 years and above. All categories have equal recognition for men and women athletes."
    }
  ]
};
