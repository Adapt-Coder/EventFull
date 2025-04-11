import React, { useState } from 'react'; // Removed useEffect as events are hardcoded
// import { Link } from 'react-router-dom'; // Remove Link import
import '../App.css'; // Use ../App.css for shared styles
// import logo from './assets/logo.png'; // Remove logo import

// Renamed App to Dashboard
function Dashboard({ username }) {
  // State remains the same
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Hardcoded events remain the same
  const events = [
    // April 10, 2025
    {
      id: 1,
      title: "BCNM 20th Anniversary Alumni Conference",
      time: "2025-04-10T09:00:00",
      location: "Banatao Auditorium, 310 Sutardja Dai Hall",
      description: "Celebrating the work of Berkeley Center for New Media alumni."
    },
    {
      id: 2,
      title: "Imagining Caribbean Futures Symposium",
      time: "2025-04-10T09:00:00",
      location: "820 Social Sciences Building",
      description: "Exploring paths forward for Caribbean people and geographies."
    },
    {
      id: 3,
      title: "Latine Journal of Law & Policy Annual Spring Symposium",
      time: "2025-04-10T09:00:00",
      location: "TBD",
      description: "Annual symposium by the Latine Journal of Law & Policy."
    },
    {
      id: 4,
      title: "BPM 208 Management Tools to Reduce Stress & Burnout",
      time: "2025-04-10T09:00:00",
      location: "Virtual Classroom",
      description: "Workshop for UC Berkeley Staff on managing competing priorities and reducing stress."
    },
    {
      id: 5,
      title: "Educating in the AI Age: Faculty Insights",
      time: "2025-04-10T10:00:00",
      location: "Online Event",
      description: "Panel of faculty sharing experiences incorporating generative AI into instruction."
    },
    {
      id: 6,
      title: "Graduate Research Seminar",
      time: "2025-04-10T11:00:00",
      location: "120 Latimer Hall",
      description: "Seminar for graduate research presentations."
    },
    {
      id: 7,
      title: "Finance Seminars: John Mondragon (Federal Reserve Bank of San Francisco)",
      time: "2025-04-10T11:10:00",
      location: "C320, Cheit Hall",
      description: "Finance seminar featuring John Mondragon."
    },
    {
      id: 8,
      title: "Melanie Hack | Everybody Needs a Helping Hand?! An Overview of Employee Rights in the Context of Elder Care in the EU and Norway",
      time: "2025-04-10T12:00:00",
      location: "201 Philosophy Hall",
      description: "Melanie Hack (University of Bergen) discusses legal frameworks for employees' rights as carers."
    },
    {
      id: 9,
      title: "Becoming Global Asia, a talk with Cheryl Naruse",
      time: "2025-04-10T12:00:00",
      location: "Wheeler Hall, Room 330 (Lounge)",
      description: "Cheryl Naruse discusses her award-winning work on contemporary genres of postcolonial capitalism in Singapore."
    },
    {
      id: 10,
      title: "Designing and Structuring Success for All Students",
      time: "2025-04-10T12:00:00",
      location: "Virtual Event",
      description: "Dr. Gilberto Conchas explores creating equitable school environments and transformative pathways."
    },
    {
      id: 11,
      title: "The Loft Hour: Andy Shanken + Stephanie Syjuco",
      time: "2025-04-10T12:00:00",
      location: "Hearst Field Annex D23",
      description: "Informal conversation featuring Andy Shanken (Architecture) and Stephanie Syjuco (Art Practice)."
    },
    {
      id: 12,
      title: "Tips and Tools for Building Resilience",
      time: "2025-04-10T12:00:00",
      location: "Virtual",
      description: "Workshop exploring attributes of resiliency and tools to strengthen resiliency skills."
    },
    {
      id: 13,
      title: "Bridging Policy, Human Rights, & Peace: Careers in International Development",
      time: "2025-04-10T12:00:00",
      location: "223 Philosophy Hall",
      description: "Career talk with Jessica Olney and Aleksandra Chmielewska on international development, technology, policy, and peacebuilding."
    },
    {
      id: 14,
      title: "The effect of population history on patterns of genetic diversity at the TAS2R bitter taste receptor genes",
      time: "2025-04-10T12:30:00",
      location: "2040 VLSB",
      description: "Seminar on genetic diversity in West Central and Central African populations."
    },
    {
      id: 15,
      title: "OEW Seminar - Michael Best (Columbia)",
      time: "2025-04-10T12:30:00",
      location: "Cheit 220",
      description: "Organizational Economics Workshop seminar featuring Michael Best."
    },
    {
      id: 16,
      title: "Shansby seminar - Marissa Sharif",
      time: "2025-04-10T12:30:00",
      location: "C110",
      description: "Marketing seminar featuring Marissa Sharif."
    },
    {
      id: 17,
      title: "ASP: Mock Exam",
      time: "2025-04-10T12:50:00",
      location: "TBD",
      description: "Academic Support Program mock exam session."
    },
    {
      id: 18,
      title: "Christians at Berkeley Law (CAB) Meeting",
      time: "2025-04-10T12:50:00",
      location: "TBD",
      description: "Meeting for the Christians at Berkeley Law group."
    },
    {
      id: 19,
      title: "Class Selection in Tech and IP: Clinics, Practicums, and Speciality Classes",
      time: "2025-04-10T13:00:00",
      location: "TBD",
      description: "Information session about class selection for Tech and IP."
    },
    {
      id: 20,
      title: "Demystifying Clinics Q&A",
      time: "2025-04-10T13:00:00",
      location: "TBD",
      description: "Question and answer session about law clinics."
    },
    {
      id: 21,
      title: "Dissertation Talk: Towards Cloud-Assisted Autonomous Driving",
      time: "2025-04-10T13:00:00",
      location: "465H Soda",
      description: "Dissertation defense related to autonomous driving."
    },
    {
      id: 22,
      title: "Trial Team Info Session",
      time: "2025-04-10T13:00:00",
      location: "TBD",
      description: "Information session for the trial team."
    },
    {
      id: 23,
      title: "Michael R. Bruchas - Neuropeptidergic Control of Action-Outcome Behavior",
      time: "2025-04-10T15:30:00",
      location: "101 Barker Hall",
      description: "Presentation on peptidergic feed-forward mechanisms in action-outcome behavior."
    },
    {
      id: 24,
      title: "ESPM Seminar Series- Lighting Talks",
      time: "2025-04-10T15:30:00",
      location: "132 Mulford Hall",
      description: "Short presentations by Berkeley grads funded by the RCNR Indigenous studies small grants program."
    },
    {
      id: 25,
      title: "Special CDP Seminar: Coping with mechanical stress: tissue dynamics during development, homeostasis and repair",
      time: "2025-04-10T15:30:00",
      location: "100 Genetics & Plant Biology Building",
      description: "Cell & Developmental Biology seminar on tissue dynamics."
    },
    {
      id: 26,
      title: "Student Research with Indigenous Communities - Lightning Talks",
      time: "2025-04-10T15:30:00",
      location: "132 Mulford Hall",
      description: "Featuring UC Berkeley graduate students Kanani D'Angelo, Cristina Méndez, and Ryan Reed."
    },
    {
      id: 27,
      title: "BPH Social Impact and EBHO (East Bay Housing Organizations) Learning Session and Mixer Event",
      time: "2025-04-10T16:00:00",
      location: "Emeriti Lounge, 5th floor of Berkeley Way West",
      description: "Berkeley Public Health social impact event with EBHO."
    },
    {
      id: 28,
      title: "Second Hundt Family Lecture on Democracy and the Rule of Law: 'Funhouse Footnote Four...'",
      time: "2025-04-10T16:00:00",
      location: "Berkeley Law Building, Room #295",
      description: "Lecture on how the Roberts Court has distorted the Civil Rights Settlement."
    },
    {
      id: 29,
      title: "The Bright Side of Grit",
      time: "2025-04-10T16:00:00",
      location: "Room 4101, Berkeley Way West",
      description: "Presentation by Dr. Jesus Alfonso D. Datu."
    },
    {
      id: 30,
      title: "Mathematics Department Colloquium: The geometry of p-curvature",
      time: "2025-04-10T16:00:00",
      location: "60 Evans Hall",
      description: "Speaker: Arthur Ogus, UC Berkeley."
    },
    {
      id: 31,
      title: "Graduate Research Conference",
      time: "2025-04-10T16:00:00",
      location: "120 Latimer Hall",
      description: "Conference for graduate research presentations."
    },
    {
      id: 32,
      title: "LEP Film Showing: \"Arab Women Say What?!\"",
      time: "2025-04-10T16:00:00",
      location: "Room #151, César Chávez Student Center",
      description: "Film exploring the experiences of Arab women immigrants in Canada."
    },
    {
      id: 33,
      title: "Solidarity Across Generations: Fields of Unity (Farmworkers Commemoration Event)",
      time: "2025-04-10T16:30:00",
      location: "Berkeley City College Auditorium",
      description: "Honoring the work of Dolores Huerta, Cesar Chavez, Larry Itliong, and others."
    },
    {
      id: 34,
      title: "Getting Buddhas and Bodhisattvas \"Right\": Magnificence and Transnational Buddhist Craftsmanship",
      time: "2025-04-10T17:00:00",
      location: "IEAS Conference Room, Banway Building",
      description: "Exploring encounters between Chinese workshop owners and Burmese Buddhist artisans."
    },
    {
      id: 35,
      title: "Nina Leger: Mémoires sauvées de l'eau",
      time: "2025-04-10T17:00:00",
      location: "Library of French Thought (4229 Dwinelle Hall)",
      description: "Presentation by French Novelist Nina Leger."
    },
    {
      id: 36,
      title: "Religion in a Changing Workplace",
      time: "2025-04-10T17:00:00",
      location: "Ethnic Studies Conference Room, 5th Floor, Social Sciences Building",
      description: "Discussion on employees bringing religious identities to work."
    },
    {
      id: 37,
      title: "Musicality and the Myriad Things",
      time: "2025-04-10T17:00:00",
      location: "370 Dwinelle Hall",
      description: "Anna Wang examines listening in spaces with multiple ideologies, focusing on Sinitic opera reception."
    },
    {
      id: 38,
      title: "Anne Hardgrove | Archer the Butcher: Sex and Murder in the Translation of the Kama Sutra",
      time: "2025-04-10T17:00:00",
      location: "Institute for South Asia Studies",
      description: "Talk examining the controversial 20th-century English translation of the Kama Sutra."
    },
    {
      id: 39,
      title: "All Consuming: Germans, Jews, and the Meaning of Meat",
      time: "2025-04-10T17:00:00",
      location: "The Magnes Collection of Jewish Art and Life",
      description: "Historian John M. Efron discusses the contested culture of meat in Germany."
    },
    {
      id: 40,
      title: "Holloway Poetry Series: Cecily Nicholson, Holloway Lecturer in the Practice of Poetry",
      time: "2025-04-10T17:30:00",
      location: "Maude Fife, 315 Wheeler Hall",
      description: "Reading by Cecily Nicholson, 2025 Holloway Lecturer."
    },
    {
      id: 41,
      title: "McGuireWoods 1L Meet & Greet",
      time: "2025-04-10T17:30:00",
      location: "TBD",
      description: "Meet and greet event for 1L students with McGuireWoods."
    },
    {
      id: 42,
      title: "Academy of Distinguished Alumni Banquet",
      time: "2025-04-10T17:30:00",
      location: "California Memorial Stadium",
      description: "Banquet honoring distinguished alumni."
    },
    {
      id: 43,
      title: "Women in Tech & Business Law Night with Gunderson Dettmer",
      time: "2025-04-10T18:00:00",
      location: "TBD",
      description: "Networking event with Gunderson Dettmer."
    },
    {
      id: 44,
      title: "Legacies of Asian Diasporic Radicalisms: Transpacific Chinese Labor organizing",
      time: "2025-04-10T18:00:00",
      location: "Ethnic Studies Library | 30 Stephens Hall",
      description: "JM Wong discusses the Equality Society (Pingshe), an anarchist labor formation in 1920s SF Chinatown."
    },
    {
      id: 45,
      title: "Sudan Advocacy Workshop with Decolonize Sudan & BASISS",
      time: "2025-04-10T18:30:00",
      location: "Rm D37 Hearst Field Annex",
      description: "Teach-in and advocacy workshop on the situation in Sudan."
    },
    {
      id: 46,
      title: "Film Screening: Shadows of Forgotten Ancestors",
      time: "2025-04-10T19:00:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of Sergei Parajanov's groundbreaking 1965 Ukrainian film."
    },
    {
      id: 48,
      title: "Mario Kart Tournament #2 (Building Wide)",
      time: "2025-04-10T20:30:00",
      location: "International House",
      description: "Building-wide Mario Kart tournament."
    },

    // April 11, 2025
    {
      id: 49,
      title: "Finance, Technology, and Governance in China Today: The High-tech and Financial Sectors",
      time: "2025-04-11T16:00:00",
      location: "TBA",
      description: "Discussion on finance and technology in China."
    },
    {
      id: 50,
      title: "Bloch Lecture: Rethinking the genealogies of ambient sound",
      time: "2025-04-11T16:30:00",
      location: "TBA",
      description: "Lecture exploring the history of ambient sound."
    },
    {
      id: 51,
      title: "Film Screening: The Velvet Underground",
      time: "2025-04-11T19:00:00",
      location: "TBA",
      description: "Screening of the documentary about The Velvet Underground."
    },
    {
      id: 52,
      title: "BCNM 20th Anniversary Alumni Conference",
      time: "2025-04-11T09:00:00", // Continued - All Day
      location: "Banatao Auditorium, 310 Sutardja Dai Hall",
      description: "Day 2 celebrating the work of Berkeley Center for New Media alumni."
    },
    {
      id: 53,
      title: "Imagining Caribbean Futures Symposium",
      time: "2025-04-11T09:00:00", // Continued - All Day
      location: "820 Social Sciences Building",
      description: "Day 2 exploring paths forward for Caribbean people and geographies."
    },

    // April 12, 2025
    {
      id: 57,
      title: "Fourth Biennial Reva and David Logan Photobook Symposium",
      time: "2025-04-12T09:00:00", // All Day
      location: "TBA",
      description: "Symposium dedicated to photobooks."
    },
    {
      id: 58,
      title: "Gallery+Studio / Make Your Mark",
      time: "2025-04-12T11:30:00",
      location: "TBA",
      description: "Art gallery event."
    },
    {
      id: 59,
      title: "Film Screening: Ukrainian Film Symposium",
      time: "2025-04-12T11:30:00",
      location: "Berkeley Art Museum and Pacific Film Archive", // Assumed location
      description: "Part of the Ukrainian Film Symposium focusing on adding nuance to perspectives of Ukrainian Soviet cinema."
    },
    {
      id: 60,
      title: "Film Screening: Roundtable Reading / Ferris by Kate DiCamillo",
      time: "2025-04-12T14:30:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Young readers read aloud from Ferris by Kate DiCamillo. Participants receive a copy."
    },
    {
      id: 61,
      title: "An Evening with Paul Stamets: How Psilocybin Mushrooms Bridge Cultures and Re-Awaken Our World",
      time: "2025-04-12T17:00:00",
      location: "Wheeler Auditorium, Wheeler Hall",
      description: "Renowned mycologist Paul Stamets discusses lessons learned from psilocybin mushrooms."
    },
    {
      id: 62,
      title: "UC Chamber Chorus & University Baroque Ensemble",
      time: "2025-04-12T20:00:00",
      location: "Hertz Concert Hall",
      description: "Performance of J.S. Bach's Gloria in excelsis Deo, BWV 191, and other works."
    },
    {
      id: 64,
      title: "Film Screening: May December",
      time: "2025-04-12T18:30:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of Todd Haynes' film starring Natalie Portman and Julianne Moore."
    },
    {
      id: 66,
      title: "Reconstructing Sogdiana: Archaeological Discoveries and Historical Narratives",
      time: "2025-04-12T09:00:00", // All Day
      location: "370 Dwinelle Hall",
      description: "Conference dedicated to the late Professor Guitty Azarpay, exploring ancient Sogdiana."
    },

    // April 13, 2025
    {
      id: 103,
      title: "Community Compost Event",
      time: "2025-04-13T11:00:00",
      location: "TBA",
      description: "Community composting event."
    },
    {
      id: 104,
      title: "Film Screening: The Stone Cross",
      time: "2025-04-13T13:30:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of Leonid Osyka's renowned 1968 film."
    },
    {
      id: 105,
      title: "Exploration of Forms: Rasaboxes",
      time: "2025-04-13T13:30:00",
      location: "Bancroft Dance Studio, 2401 Bancroft Way",
      description: "Workshop led by TDPS faculty exploring the heightened expression of eight primary emotions."
    },
    {
      id: 106,
      title: "Alvin Ailey American Dance Theater",
      time: "2025-04-13T15:00:00",
      location: "Zellerbach Hall",
      description: "Performance by the legendary dance company."
    },
    {
      id: 107,
      title: "Owls",
      time: "2025-04-13T15:00:00",
      location: "Hertz Hall",
      description: "Cal Performances presents Owls."
    },
    {
      id: 108,
      title: "Film Screening: Arsenal",
      time: "2025-04-13T15:30:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of Oleksandr Dovzhenko's masterful 1929 Soviet film."
    },
    {
      id: 109,
      title: "Film Screening: All We Imagine as Light",
      time: "2025-04-13T18:00:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of the Cannes Grand Prix winner about three hospital workers in Mumbai."
    },
    {
      id: 110,
      title: "RCC Movie Night",
      time: "2025-04-13T19:00:00",
      location: "International House, 2299 Piedmont Ave",
      description: "Residential Computing Center movie night."
    },
    {
      id: 111,
      title: "Javanese Gamelan: Shadowplay",
      time: "2025-04-13T19:30:00",
      location: "Hertz Concert Hall",
      description: "Experience Javanese shadow puppetry featuring Ki Hanggoro Murti and Gamelan Sari Raras."
    },
    {
      id: 112,
      title: "Exhibit | A Storied Campus: Cal in Fiction",
      time: "2025-04-13T09:00:00", // All Day
      location: "The Rowell Exhibition Cases, Doe Library, 2nd floor",
      description: "Exhibition highlighting portrayals of Cal in fiction."
    },
    {
      id: 113,
      title: "Exhibit | Amy Tan's Backyard Birds",
      time: "2025-04-13T09:00:00", // All Day
      location: "The Bancroft Library Gallery",
      description: "Exhibition of drawings by Amy Tan from her book 'The Backyard Bird Chronicles'."
    },
    {
      id: 114,
      title: "Exhibit | From Cartonera to Cordel: Aesthetics of Caribbean and Latin American Book Art",
      time: "2025-04-13T09:00:00", // All Day
      location: "Bernice Layne Brown Gallery in Doe Library",
      description: "Exhibition showcasing ingenuity of Caribbean and Latin American publishers using repurposed materials."
    },
    {
      id: 115,
      title: "Exhibit: Future of Food",
      time: "2025-04-13T09:00:00", // All Day
      location: "Lawrence Hall of Science",
      description: "Hands-on exhibition about sustainable food choices."
    },
    {
      id: 116,
      title: "Lau Grants for Just Climate Futures | Exhibition + Reception",
      time: "2025-04-13T09:00:00", // All Day
      location: "Bauer Wurster Gallery",
      description: "Exhibition showcasing climate change research by CED faculty recipients of 2024 Lau Grants."
    },
    {
      id: 117,
      title: "Music in MLK",
      time: "2025-04-13T12:00:00", // Weekly 12-1pm, assuming Sunday instance
      location: "MLK 1st Floor Game Zone",
      description: "Live music with UC Jazz."
    },
    {
      id: 118,
      title: "Steeped in Time: The Past & Present of Assam Tea",
      time: "2025-04-13T09:00:00", // All Day
      location: "120 Doe Library (South/Southeast Asia Library)",
      description: "A curated exhibition that traces the enduring legacy and evolving future of Assam tea."
    },

    // April 14, 2025
    {
      id: 67,
      title: "Probabilistic Modeling: Bridging Physics and Deep Learning",
      time: "2025-04-14T11:00:00",
      location: "50 Birge Hall", // Assumed from Condensed Matter seminar
      description: "Talk on probabilistic modeling in physics and AI."
    },
    {
      id: 68,
      title: "Probabilistic Operator Algebra Seminar: Upgraded free independence",
      time: "2025-04-14T09:00:00",
      location: "502 Davis Hall",
      description: "Speaker: Seivatsav Kunnawalkam Elayavalli, UCSD."
    },
    {
      id: 69,
      title: "SEMM Seminar",
      time: "2025-04-14T12:00:00",
      location: "325 McCone Hall",
      description: "Structural Engineering, Mechanics and Materials Seminar."
    },
    {
      id: 70,
      title: "Special Dinosaur-Extinction Seminar",
      time: "2025-04-14T12:00:00",
      location: "502 Davis Hall",
      description: "Seminar focusing on dinosaur extinction."
    },
    {
      id: 71,
      title: "Engineering AI-Driven Data Centers: Structural Challenges & Innovations",
      time: "2025-04-14T12:00:00",
      location: "TBA",
      description: "Exploring the evolution of data centers and key structural/engineering considerations."
    },
    {
      id: 72,
      title: "CSLS Speaker Series – \"Testing Universalism...\"",
      time: "2025-04-14T12:15:00",
      location: "177 Stanley Hall",
      description: "Center for the Study of Law and Society speaker series."
    },
    {
      id: 73,
      title: "Career Lab: Negotiating Job Offers (basic strategies for non-faculty roles)",
      time: "2025-04-14T12:30:00",
      location: "124 Barker Hall",
      description: "Workshop for students negotiating non-faculty job offers."
    },
    {
      id: 74,
      title: "Neuro Department Faculty Meeting - April 2025",
      time: "2025-04-14T12:30:00",
      location: "C320, Cheit Hall",
      description: "Faculty meeting for the Neuroscience Department."
    },
    {
      id: 75,
      title: "Finance Lunch Seminars: Ali Kakhbod",
      time: "2025-04-14T12:40:00",
      location: "TBD",
      description: "Finance seminar featuring Ali Kakhbod."
    },
    {
      id: 76,
      title: "Mindful Monday",
      time: "2025-04-14T13:00:00",
      location: "TBD",
      description: "Mindfulness session."
    },
    {
      id: 77,
      title: "IP Litigation Strategies with Big Law",
      time: "2025-04-14T13:00:00",
      location: "Other Campus Location",
      description: "Discussion on IP litigation strategies."
    },
    {
      id: 78,
      title: "Library Workshop: Golden Bear Gear up: Cal Merch Workshop",
      time: "2025-04-14T13:00:00",
      location: "TBD",
      description: "Workshop related to Cal merchandise."
    },
    {
      id: 79,
      title: "Seminar 231, Public Finance:",
      time: "2025-04-14T14:00:00",
      location: "648 Evans Hall",
      description: "Public Finance seminar."
    },
    {
      id: 80,
      title: "Seminar 211, Economic History: Charoo Anand (UC Berkeley)",
      time: "2025-04-14T14:00:00",
      location: "Evans Hall 639",
      description: "Charoo Anand presents 'Highways and Segregation: Evidence from the US South'."
    },
    {
      id: 81,
      title: "Condensed Matter Seminar: Competitive Structural and Electronic States Under Pressure",
      time: "2025-04-14T14:30:00",
      location: "50 Birge Hall",
      description: "Shanti Deemyad, University of Utah, discusses how high pressure tunes interatomic interactions."
    },
    {
      id: 82,
      title: "Linguistics Department Colloquium by Yi Ting Huang (University of Maryland)",
      time: "2025-04-14T15:00:00",
      location: "370 Dwinelle Hall",
      description: "Colloquium featuring Yi Ting Huang."
    },
    {
      id: 83,
      title: "Composition Colloquium: Jarosław Kapuściński",
      time: "2025-04-14T15:00:00",
      location: "CNMAT Main Room",
      description: "Jarosław Kapuściński discusses composing intermedia, from audiovisual piano to VR."
    },
    {
      id: 84,
      title: "The Emergence of the \"I\" in East Slavic Lyric",
      time: "2025-04-14T16:00:00",
      location: "109 Dwinelle Hall",
      description: "Presentation on East Slavic lyric poetry."
    },
    {
      id: 85,
      title: "Chill: How the Supreme Court Inadequately and Inconsistently Deals with the Concept of Chilling of Speech",
      time: "2025-04-14T16:00:00",
      location: "Goldberg Room, 297 Simon Hall",
      description: "J. Clifford Wallace Lecture Series featuring Dean Erwin Chemerinsky."
    },
    {
      id: 86,
      title: "Cynthia A. Chan Memorial Lecture",
      time: "2025-04-14T16:00:00",
      location: "International House",
      description: "Annual memorial lecture."
    },
    {
      id: 87,
      title: "Seminar 208, Microeconomic Theory: 'How competition shapes information...'",
      time: "2025-04-14T16:00:00",
      location: "597 Evans Hall",
      description: "Microeconomic Theory seminar."
    },
    {
      id: 88,
      title: "Seminar 271, Development: 'Risk sharing tests and covariate shocks'",
      time: "2025-04-14T16:00:00",
      location: "Evans Hall Room 648",
      description: "Development economics seminar."
    },
    {
      id: 89,
      title: "Analysis and PDE Seminar: The conformal nonlinear wave equation...",
      time: "2025-04-14T16:10:00",
      location: "736 Evans Hall",
      description: "Speaker: Ben Dodson, Johns Hopkins University."
    },
    {
      id: 90,
      title: "Thirty-Fifth Annual Tarski Lectures (Lecture 1): Euclid's Elements and Diagrammatic Reasoning",
      time: "2025-04-14T16:10:00",
      location: "Banatao Auditorium Sutardja Dai Hall",
      description: "Speaker: Jeremy Avigad, Carnegie Mellon University."
    },
    {
      id: 91,
      title: "Physics Colloquia: DESI shakes up the dark Universe",
      time: "2025-04-14T16:15:00",
      location: "1 Physics North",
      description: "Nathalie Palanque-Delabrouille, LBNL, discusses the Dark Energy Spectroscopic Instrument."
    },
    {
      id: 92,
      title: "Private Sector Careers in International Litigation and Arbitration",
      time: "2025-04-14T17:30:00",
      location: "TBD",
      description: "Discussion on careers in international law."
    },
    {
      id: 93,
      title: "Wonne Ickx: The Architects' Garden",
      time: "2025-04-14T18:00:00",
      location: "112 Bauer Wurster Hall",
      description: "Prof. Ickx discusses architecture as a time-based practice."
    },
    {
      id: 94,
      title: "Game on Challenge",
      time: "2025-04-14T20:30:00",
      location: "International House",
      description: "Gaming challenge event."
    },
    {
      id: 95,
      title: "Exhibit | A Storied Campus: Cal in Fiction",
      time: "2025-04-14T09:00:00", // All Day
      location: "The Rowell Exhibition Cases, Doe Library, 2nd floor",
      description: "Exhibition highlighting portrayals of Cal in fiction."
    },
    {
      id: 96,
      title: "Exhibit | Amy Tan's Backyard Birds",
      time: "2025-04-14T09:00:00", // All Day
      location: "The Bancroft Library Gallery",
      description: "Exhibition of drawings by Amy Tan from her book 'The Backyard Bird Chronicles'."
    },
    {
      id: 97,
      title: "Exhibit | Centering Philippine and Filipinx American Histories",
      time: "2025-04-14T09:00:00", // All Day
      location: "The Bancroft Library (corridor)",
      description: "Selections from The Bancroft Library relating to the Philippines."
    },
    {
      id: 98,
      title: "Exhibit | From Cartonera to Cordel: Aesthetics of Caribbean and Latin American Book Art",
      time: "2025-04-14T09:00:00", // All Day
      location: "Bernice Layne Brown Gallery in Doe Library",
      description: "Exhibition showcasing ingenuity of Caribbean and Latin American publishers using repurposed materials."
    },
    {
      id: 99,
      title: "Exhibit: Future of Food",
      time: "2025-04-14T09:00:00", // All Day
      location: "Lawrence Hall of Science",
      description: "Hands-on exhibition about sustainable food choices."
    },
    {
      id: 100,
      title: "Lau Grants for Just Climate Futures | Exhibition + Reception",
      time: "2025-04-14T09:00:00", // All Day
      location: "Bauer Wurster Gallery",
      description: "Exhibition showcasing climate change research by CED faculty recipients of 2024 Lau Grants."
    },
    {
      id: 102,
      title: "Asphalt Concrete Materials & Mix Design",
      time: "2025-04-14T13:00:00",
      location: "Online",
      description: "First session of a four-part class on asphalt concrete."
    }
  ];

  // Handlers remain the same
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  // Filtering logic remains the same
  const filteredEvents = events.filter(event => {
    const eventDate = event.time ? event.time.substring(0, 10) : null;
    const dateMatch = !selectedDate || (eventDate === selectedDate);
    const searchMatch = !searchTerm || 
                        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const locationMatch = !locationFilter || 
                          (event.location && event.location.toLowerCase().includes(locationFilter.toLowerCase()));
    return dateMatch && searchMatch && locationMatch;
  });

  // JSX structure remains largely the same, but wrapped in a fragment
  return (
    <>
      <header className="app-header">
        {/* Remove Logo Link */}
        {/* <Link to="/about" className="header-logo-link">
          <img src={logo} alt="EventFull Logo" className="header-logo" />
        </Link> */}
        <h1>EventFull Dashboard</h1> {/* Keep updated title or revert if preferred */}
        {username && <span className="username-display">Welcome, {username}!</span>} {/* Keep username display */}
      </header>

      <main className="main-content">
        <aside className="filters-sidebar">
          <h2>Filters</h2>
          <div className="filter-group">
            <label htmlFor="date-filter">Date</label>
            <input 
              type="date" 
              id="date-filter" 
              value={selectedDate}
              onChange={handleDateChange}
            />
            {selectedDate && (
              <button 
                onClick={() => setSelectedDate('')} 
                className="clear-filter-button"
              >
                Clear Date
              </button>
            )}
          </div>
          <div className="filter-group">
            <label htmlFor="location-filter">Location</label>
            <input 
              type="text"
              id="location-filter"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={handleLocationFilterChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="category-filter">Category</label>
            <select id="category-filter">
              <option value="all">All</option>
              <option value="tech">Tech</option>
              <option value="art">Art</option>
              <option value="music">Music</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        </aside>

        <section className="event-list-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button>Search</button>
          </div>
          <div className="event-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h2>{event.title}</h2>
                  <p>{event.description || 'No description available.'}</p>
                  <div className="event-details">
                    {event.time && <span><strong>Time:</strong> {new Date(event.time).toLocaleString()}</span>}
                    {event.location && <span><strong>Location:</strong> {event.location}</span>}
                  </div>
                  <div className="event-actions">
                    <button>Save</button>
                    <button>Rate</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No events found matching your search criteria.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 EventFull. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Dashboard; 