import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // To redirect users
} from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase auth functions
import { auth } from './firebaseConfig'; // Import the configured auth instance
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import SavedEventsPage from './components/SavedEventsPage'; // Import SavedEventsPage
import SignUpPage from './components/SignUpPage'; // Import SignUpPage
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css'; // Keep global styles if needed

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

// Define events data outside the component or fetch it if needed
const events = [
    // April 30, 2025
    {
      id: 1,
      title: "BPM 108 Recruiting & Hiring Staff",
      time: "2025-04-30T09:00:00",
      location: "Virtual Classroom",
      description: "This workshop is for UC Berkeley Staff covering federal and state regulations and UC policies for recruitment."
    },
    {
      id: 2,
      title: "Denim Day 2025",
      time: "2025-04-30T10:00:00",
      location: "Berkeley Way West - First Floor Lobby",
      description: "Sexual Assault Awareness Month event at Berkeley Way West."
    },
    {
      id: 3,
      title: "CONSCIOUSNESS AND OBJECTIVE REALITY: THE MIND-BODY PROBLEM",
      time: "2025-04-30T10:00:00",
      location: "Online-only event",
      description: "Discussion on consciousness and objective reality."
    },
    {
      id: 4,
      title: "Computer Ergonomics 101",
      time: "2025-04-30T10:00:00",
      location: "Class of '42, Tang Center",
      description: "Learn how to set up a user-friendly ergonomic workstation and incorporate wellness activities."
    },
    {
      id: 5,
      title: "CEE Carnival",
      time: "2025-04-30T10:00:00",
      location: "Memorial Glade",
      description: "Celebrate the start of summer at the CEE Carnival, hosted by the Department of Civil and Environmental Engineering at UC Berkeley!"
    },
    {
      id: 6,
      title: "STEM OPT Document Check Workshop",
      time: "2025-04-30T10:30:00",
      location: "Zoom",
      description: "Join Berkeley International Office as you prepare your STEM OPT application!"
    },
    {
      id: 7,
      title: "Niall Ó Dochartaigh | Making Peace in the Shadows",
      time: "2025-04-30T11:00:00",
      location: "201 Philosophy Hall, UC Berkeley",
      description: "Back-channel Negotiation in the Irish Peace Process"
    },
    {
      id: 8,
      title: "Applied Mathematics Seminar",
      time: "2025-04-30T11:00:00",
      location: "939 Evans Hall",
      description: "Exploiting Low-Dimensional Structure in Bayesian Inverse Problems Governed by Ice Sheet Flow Models"
    },
    {
      id: 9,
      title: "Rethinking Corporate Ownership",
      time: "2025-04-30T11:30:00",
      location: "Haas School of Business Spieker Forum",
      description: "Explore enterprise foundation ownership, co-ops, purpose trusts, and other alternative ownership models."
    },
    {
      id: 10,
      title: "Noon Concert: Balinese Gamelan",
      time: "2025-04-30T12:00:00",
      location: "Hertz Concert Hall",
      description: "Gamelan Music and Dance of Bali featuring I Ketut Cater & Lisa Gold, directors"
    },
    {
      id: 11,
      title: "Demography Brown Bag Seminar",
      time: "2025-04-30T12:00:00",
      location: "310 Social Sciences Building",
      description: "Shelley Clark presents: 'Declining Child Poverty Despite Growing Family Diversity in Rural America'"
    },
    {
      id: 12,
      title: "Bioengineering Seminar",
      time: "2025-04-30T12:00:00",
      location: "Stanley Hall, Room 106",
      description: "Lab-on-CMOS Platforms for Cell Culture Monitoring and Drug Potency Studies"
    },
    {
      id: 13,
      title: "CTML Seminar Series",
      time: "2025-04-30T12:00:00",
      location: "2121 Berkeley Way",
      description: "Carlos García Meixide presents research on biostatistics topics"
    },
    {
      id: 14,
      title: "International Job Search - Faculty Career Chat",
      time: "2025-04-30T12:00:00",
      location: "Virtual",
      description: "Chat with Dr. Eva Schmid, Head of Scientific Training at Vienna Biocenter"
    },
    {
      id: 15,
      title: "History Colloquium with John Efron",
      time: "2025-04-30T12:00:00",
      location: "3335 Dwinelle Hall",
      description: "Meat and the Boundaries of Belonging in German-Jewish History"
    },
    {
      id: 16,
      title: "Berkeley Book Chat with Alva Noë",
      time: "2025-04-30T12:01:00",
      location: "Geballe Room, 220 Stephens Hall",
      description: "Discussion of 'The Entanglement' exploring the inseparability of life, art, and philosophy"
    },
    {
      id: 17,
      title: "Potential Pike Use in Paleolithic Megafauna Hunting",
      time: "2025-04-30T12:10:00",
      location: "Archaeological Research Facility",
      description: "Lithic/Skeletal Associations, Rock Art Depictions and Ethnohistorical Comparisons"
    },
    {
      id: 18,
      title: "Unraveling mechanisms behind Salmonella persistence",
      time: "2025-04-30T12:10:00",
      location: "101 Morgan Hall",
      description: "Denise M. Monack presents research on Salmonella persistence in a mouse model"
    },
    {
      id: 19,
      title: "When the Horrors of War Meet the Power of Literature",
      time: "2025-04-30T12:30:00",
      location: "4125A Dwinelle Hall",
      description: "Reactions and Transformations with Sarai Shavit"
    },
    // May 1, 2025
    {
      id: 20,
      title: "Learning How English Works Study Sessions",
      time: "2025-05-01T09:00:00",
      location: "Virtual Classroom",
      description: "CRLP study session focusing on Learning How English Works"
    },
    {
      id: 21,
      title: "May Day Conference on Free Inquiry",
      time: "2025-05-01T08:30:00",
      location: "2299 Piedmont Ave",
      description: "Conference exploring free inquiry in academia"
    },
    {
      id: 22,
      title: "Dissertation Talk: Predicting gene expression",
      time: "2025-05-01T09:00:00",
      location: "380 Soda",
      description: "Using sequence-based deep learning models"
    },
    {
      id: 23,
      title: "MCAH SIG Abortion Fundraiser",
      time: "2025-05-01T10:00:00",
      location: "Berkeley Way West, Room 5101",
      description: "Spring 2025 MCAH SIG Abortion Fundraiser"
    },
    {
      id: 24,
      title: "Designing Metabolism-Based Therapeutics",
      time: "2025-05-01T10:30:00",
      location: "IGIB 115",
      description: "Using the Paradigm of Ferroptosis"
    },
    {
      id: 25,
      title: "Finance Seminars",
      time: "2025-05-01T11:10:00",
      location: "C320, Cheit Hall",
      description: "Paige Ouimet from University of North Carolina presents"
    },
    {
      id: 26,
      title: "Lunch Poems: Megan Fernandes",
      time: "2025-05-01T12:10:00",
      location: "Morrison Library",
      description: "Berkeley's storied noontime poetry series"
    },
    {
      id: 27,
      title: "Plant-pollinator-microbe interactions",
      time: "2025-05-01T12:30:00",
      location: "2040 VLSB",
      description: "Initial efforts toward two-eyed seeing at Stanford's biological preserve"
    },
    {
      id: 28,
      title: "OEW Seminar - Melissa Dell",
      time: "2025-05-01T12:30:00",
      location: "Cheit 220",
      description: "Presentation by Melissa Dell from Harvard"
    },
    {
      id: 29,
      title: "Arabic Manuscript Workshop",
      time: "2025-05-01T13:00:00",
      location: "3401 Dwinelle Hall",
      description: "Explore pre-colonial Algerian manuscripts"
    },
    {
      id: 30,
      title: "CANCELED: Seminar 251, Labor",
      time: "2025-05-01T14:00:00",
      location: "648 Evans Hall",
      description: "Topic Forthcoming"
    },
    {
      id: 31,
      title: "Destress Fest",
      time: "2025-05-01T14:00:00",
      location: "MLK Jr. Building",
      description: "Take a break from the books and celebrate the end of the semester with a pool theme event!"
    },
    {
      id: 32,
      title: "Student Probability/PDE Seminar",
      time: "2025-05-01T14:40:00",
      location: "891 Evans Hall",
      description: "Boltzmann-Grad Limit for Hard Sphere Model VII"
    },
    {
      id: 33,
      title: "Celebrate Preservation Week at the Library!",
      time: "2025-05-01T15:00:00",
      location: "223 Doe Library",
      description: "Hands-on introduction to the Preservation and Conservation profession"
    },
    {
      id: 34,
      title: "Panel and Screening of 'Sort of' with Bilal Baig",
      time: "2025-05-01T15:00:00",
      location: "Location provided upon RSVP",
      description: "Transfemininity in the media"
    },
    // May 2, 2025
    {
      id: 35,
      title: "The UC Berkeley Global Forum",
      time: "2025-05-02T09:00:00",
      location: "Banatao Auditorium",
      description: "Contemporary Challenges in the Asia Pacific"
    },
    {
      id: 36,
      title: "Dissertation Talk: Security and Privacy in 2FA Apps",
      time: "2025-05-02T09:30:00",
      location: "Zoom",
      description: "Exploring the Security and Privacy Impacts of Using 2FA Apps"
    },
    {
      id: 37,
      title: "Math 198/290 Seminar",
      time: "2025-05-02T10:00:00",
      location: "1011 Evans Hall",
      description: "Rao-Blackwell Theorem: David Blackwell: Memories and Work"
    },
    {
      id: 38,
      title: "Migration Today: New Evidence",
      time: "2025-05-02T11:00:00",
      location: "310 Social Sciences Building",
      description: "Panel event with population scholars from the northern California Bay Area"
    },
    {
      id: 39,
      title: "The Origin and Evolution of Avalokiteśvara Images",
      time: "2025-05-02T12:00:00",
      location: "Via Zoom",
      description: "New Discoveries from Gandhāra"
    },
    {
      id: 40,
      title: "Friday Concert: Clara Schuur Solo Violin",
      time: "2025-05-02T12:00:00",
      location: "Wu Performance Hall",
      description: "Clara Schuur Solo Violin Capstone Recital"
    },
    {
      id: 41,
      title: "Labor Lunch Seminar",
      time: "2025-05-02T12:00:00",
      location: "648 Evans Hall",
      description: "Housing first or treatment first?: Evidence from the VA's homelessness programs"
    },
    {
      id: 42,
      title: "Building a Narrative for Career Development",
      time: "2025-05-02T12:00:00",
      location: "Stanley Hall 177",
      description: "Workshop led by Urmila Venkatesh, Assistant Director of Alumni Career Education, Stanford University"
    },
    {
      id: 43,
      title: "Brilliance of Berkeley",
      time: "2025-05-02T12:00:00",
      location: "150 Wheeler Hall",
      description: "Featuring Britt Glaunsinger & Max Auffhammer"
    },
    {
      id: 44,
      title: "BETR/EECS Solid State Technologies Seminar",
      time: "2025-05-02T13:00:00",
      location: "Hogan Room, Cory Hall",
      description: "Dr. Michael S. Eggleston presents on Quantum Computing"
    },
    {
      id: 45,
      title: "Arabic and Berber Manuscripts",
      time: "2025-05-02T13:00:00",
      location: "3335 Dwinelle Hall",
      description: "A Maghribi Written Tradition"
    },
    {
      id: 46,
      title: "Berkeley Analytics Lab Showcase",
      time: "2025-05-02T13:00:00",
      location: "Mudd Hall",
      description: "Hands-on analysis and research by Berkeley Analytics students"
    },
    {
      id: 47,
      title: "ITS Affiliated Student PhD Talks",
      time: "2025-05-02T15:00:00",
      location: "410 McLaughlin Hall",
      description: "Celebrating research of graduating doctoral candidates"
    },
    {
      id: 48,
      title: "A Tribute to Clifford Lynch",
      time: "2025-05-02T15:10:00",
      location: "202 South Hall and Online",
      description: "Honoring the contributions of Clifford Lynch"
    },
    {
      id: 49,
      title: "Caring for Our Ancestors",
      time: "2025-05-02T16:00:00",
      location: "Hearst Field Annex D23",
      description: "weaving ~ listening ~ writing"
    },
    // Ongoing Exhibitions
    {
      id: 50,
      title: "Exhibit | A Storied Campus: Cal in Fiction",
      time: "2025-04-30T09:00:00",
      location: "The Rowell Exhibition Cases, Doe Library",
      description: "Exhibition highlighting portrayals of Cal in fiction",
      isAllDay: true
    },
    {
      id: 51,
      title: "Exhibit | Amy Tan's Backyard Birds",
      time: "2025-04-30T09:00:00",
      location: "The Bancroft Library Gallery",
      description: "Series of drawings by Amy Tan from The Backyard Bird Chronicles",
      isAllDay: true
    },
    {
      id: 52,
      title: "Exhibit | Centering Philippine and Filipinx American Histories",
      time: "2025-04-30T09:00:00",
      location: "The Bancroft Library (corridor)",
      description: "Selections spanning nearly 500 years of Philippine history",
      isAllDay: true
    },
    {
      id: 53,
      title: "Exhibit | From Cartonera to Cordel",
      time: "2025-04-30T09:00:00",
      location: "Bernice Layne Brown Gallery",
      description: "Aesthetics of Caribbean and Latin American Book Art",
      isAllDay: true
    },
    {
      id: 54,
      title: "Exhibit: Future of Food",
      time: "2025-04-30T09:00:00",
      location: "Lawrence Hall of Science",
      description: "Discover how food choices can help heal the planet",
      isAllDay: true
    },
    {
      id: 55,
      title: "Steeped in Time: The Past & Present of Assam Tea",
      time: "2025-04-30T09:00:00",
      location: "120 Doe Library",
      description: "Exhibition tracing the enduring legacy and evolving future of Assam tea",
      isAllDay: true
    },
    {
      id: 56,
      title: "Berkeley Dance Project",
      time: "2025-05-02T20:00:00",
      location: "Zellerbach Playhouse",
      description: "Celebrating our vibrant and diverse community of dancemakers"
    },
    {
      id: 57,
      title: "The Tallis Scholars: Palestrina 500",
      time: "2025-05-02T20:00:00",
      location: "First Congregational Church",
      description: "Celebrating Palestrina's 500th birthday with classic polyphony"
    },
    {
      id: 58,
      title: "UC Berkeley Philharmonia Orchestra",
      time: "2025-05-02T20:00:00",
      location: "Hertz Concert Hall",
      description: "Featuring Sibelius Symphony No. 2 and Ravel's Le Tombeau de Couperin"
    },
    {
      id: 59,
      title: "Capstone Recital: Tansy Chen",
      time: "2025-05-02T20:00:00",
      location: "Wu Performance Hall",
      description: "Flute performance by Tansy Chen"
    },
    {
      id: 60,
      title: "Exhibit | A Storied Campus: Cal in Fiction",
      time: "2025-05-18T09:00:00",
      location: "The Rowell Exhibition Cases, Doe Library, 2nd floor",
      description: "Exhibition highlights portrayals of Cal in fiction through book covers, excerpts, illustrations, photographs, and more from the University Archives and Bancroft Library collections.",
      isAllDay: true
    },
    {
      id: 61,
      title: "Exhibit | Amy Tan's Backyard Birds",
      time: "2025-05-18T09:00:00",
      location: "The Bancroft Library Gallery",
      description: "A series of whimsical bird drawings by Amy Tan, featured in her bestselling book The Backyard Bird Chronicles.",
      isAllDay: true
    },
    {
      id: 62,
      title: "Exhibit | From Cartonera to Cordel: Aesthetics of Caribbean and Latin American Book Art",
      time: "2025-05-18T09:00:00",
      location: "Bernice Layne Brown Gallery in Doe Library",
      description: "Showcasing upcycled literary art from Caribbean and Latin American publishers and artists, reflecting unique viewpoints and folkloric aesthetics.",
      isAllDay: true
    },
    {
      id: 63,
      title: "Music in MLK with UC Jazz",
      time: "2025-05-18T12:00:00",
      location: "MLK 1st Floor Game Zone",
      description: "Sit back and relax while enjoying live music with UC Jazz. Ongoing Thursdays, 12-1pm.",
      isAllDay: false
    },
    {
      id: 64,
      title: "Out of the Wild + Into the Garden: Exhibition",
      time: "2025-05-18T09:00:00",
      location: "Environmental Design Library, 210 Bauer Wurster Hall",
      description: "Features giclee prints of herbarium specimens, historical documentation of UC Berkeley's Blake Garden, and pressed plant compositions by Katherine Greenberg.",
      isAllDay: true
    },
    {
      id: 65,
      title: "Steeped in Time: The Past & Present of Assam Tea",
      time: "2025-05-18T09:00:00",
      location: "120 Doe Library (South/Southeast Asia Library)",
      description: "Exhibition tracing the legacy and future of Assam tea, curated by Shreya Chaudhuri, exploring colonial legacies and Indigenous agroforestry practices.",
      isAllDay: true
    },
    {
      id: 66,
      title: "Film and Video Makers at Cal: Works from the Eisner Competition",
      time: "2025-05-18T14:00:00",
      location: "Berkeley Art Museum and Pacific Film Archive",
      description: "Screening of outstanding student films, prizewinners, and honorable mentions in the Eisner Prize competition. Includes Q&A with filmmakers."
    },
    {
      id: 67,
      title: "Rausser College of Natural Resources Commencement",
      time: "2025-05-18T19:00:00",
      location: "Hearst Greek Theatre",
      description: "Commencement ceremony for graduate and undergraduate students of Rausser College of Natural Resources. Livestream available."
    },
    {
      id: 68,
      title: "Cost Share - RAPDP Specialty",
      time: "2025-05-19T09:00:00",
      location: "Zoom",
      description: "Workshop on proposing, setting up, tracking, and reporting on cost-share commitments to a sponsored project."
    },
    {
      id: 69,
      title: "Probabilistic Operator Algebra Seminar: Tensor free independence and central limit theorem",
      time: "2025-05-19T09:00:00",
      location: "Zoom",
      description: "Speaker: Sang-Jun Park, University of Toulouse CNRS. Seminar on tensor free independence in random matrices and a new form of the central limit theorem."
    },
    {
      id: 70,
      title: "Move Out",
      time: "2025-05-19T10:00:00",
      location: "Stanley Hall, Room 177",
      description: "Move out event for students."
    },
    {
      id: 71,
      title: "Bioengineering Seminar: Targeting Stromal Cells for Immuno-Engineering",
      time: "2025-05-19T11:00:00",
      location: "Stanley Hall, Room 177",
      description: "Dr. Andy Tay, National University of Singapore. Seminar on targeting stromal cells for immuno-engineering."
    },
    {
      id: 72,
      title: "BPH Commencement Ceremony",
      time: "2025-05-19T14:00:00",
      location: "Hearst Greek Theatre",
      description: "School of Public Health Class of 2025 commencement ceremony. Reception at Campanile Esplanade 5-6pm."
    },
    {
      id: 73,
      title: "Theater, Dance, and Performance Studies Commencement Ceremony",
      time: "2025-05-19T14:00:00",
      location: "Zellerbach Playhouse",
      description: "Commencement ceremony for the Department of Theater, Dance, and Performance Studies."
    },
    {
      id: 74,
      title: "Special Condensed Matter Seminar",
      time: "2025-05-19T14:30:00",
      location: "50 Birge Hall",
      description: "Speaker and lecture description to be released."
    },
    {
      id: 75,
      title: "Dissertation Talk: End-to-end Heterogeneous System Design for Hyperscale Big Data Processing",
      time: "2025-05-19T15:00:00",
      location: "Wozniak Lounge (430-438), Soda Hall",
      description: "Dissertation talk on system design for big data processing."
    },
    {
      id: 76,
      title: "Cognitive Neuroscience Colloquium",
      time: "2025-05-19T15:00:00",
      location: "1104 Berkeley Way West",
      description: "Alex Gileles-Hillel and Shoham Choshen-Hillel present at the Cognitive Neuroscience Colloquium."
    },
    {
      id: 77,
      title: "Chemistry Symposium Day",
      time: "2025-05-20T09:00:00",
      location: "Chemistry Plaza, including Tan 100, Latimer 120, and more",
      description: "All-day event fostering scientific discussion, collaboration, and networking among Chemistry Department members."
    },
    {
      id: 78,
      title: "BPM 202 Communicating with Impact",
      time: "2025-05-20T09:00:00",
      location: "Virtual Classroom",
      description: "Workshop for UC Berkeley Staff on effective communication tools and techniques."
    },
    {
      id: 79,
      title: "Traffic Flow Principles for Practitioners",
      time: "2025-05-20T09:00:00",
      location: "Online",
      description: "Class on traffic flow principles for practitioners. Daily sessions to May 22."
    },
    {
      id: 80,
      title: "2025 College of Environmental Design Commencement",
      time: "2025-05-20T09:00:00",
      location: "Greek Theatre",
      description: "Commencement ceremony for the College of Environmental Design."
    },
    {
      id: 81,
      title: "New Employee Resource Orientation (NERO) Virtual",
      time: "2025-05-20T09:00:00",
      location: "Online",
      description: "Orientation for new employees to learn about campus resources, benefits, and history."
    },
    {
      id: 82,
      title: "2025 Department of History Commencement",
      time: "2025-05-20T09:30:00",
      location: "Zellerbach Hall",
      description: "History Department commencement ceremony at Zellerbach Auditorium."
    },
    {
      id: 83,
      title: "MTx/Neuroscience Seminar: Decoding neurodegeneration using iPSCs, CRISPR, and 'omics",
      time: "2025-05-20T10:00:00",
      location: "245 Li Ka Shing Center",
      description: "Seminar on decoding neurodegeneration using iPSCs, CRISPR, and omics."
    },
    {
      id: 84,
      title: "Microsoft Excel Scenario Analysis",
      time: "2025-05-20T13:30:00",
      location: "Virtual Classroom",
      description: "Course on scenario analysis in Microsoft Excel workbooks."
    },
    {
      id: 85,
      title: "Pavement Sustainability",
      time: "2025-05-20T14:00:00",
      location: "Online",
      description: "Class on pavement sustainability. Sessions continue to May 22."
    },
    {
      id: 86,
      title: "Library Workshop: Developing and using open-source software tools",
      time: "2025-05-20T15:00:00",
      location: "Online",
      description: "Bay Area Open Science Group May Meeting: Developing and using open-source software tools for neuroinformatics and biomechanics."
    },
    {
      id: 87,
      title: "The Film & Media Commencement Ceremony",
      time: "2025-05-20T19:00:00",
      location: "Zellerbach Hall",
      description: "Commencement ceremony for the Film & Media Department."
    },
    {
      id: 88,
      title: "The Rhetoric Commencement Ceremony",
      time: "2025-05-20T19:00:00",
      location: "Zellerbach Hall",
      description: "Commencement ceremony for the Rhetoric Department."
    },
    {
      id: 89,
      title: "Neuroscience Spring Thesis Symposium",
      time: "2025-05-21T09:00:00",
      location: "101 Barker Hall",
      description: "Symposium for neuroscience spring thesis presentations."
    },
    {
      id: 90,
      title: "Class of 2025 Engineering Baccalaureate Degree Commencement",
      time: "2025-05-21T09:00:00",
      location: "Hearst Greek Theatre",
      description: "Commencement ceremony for Baccalaureate degree graduates of the College of Engineering."
    },
    {
      id: 91,
      title: "Coffee Connection",
      time: "2025-05-21T09:00:00",
      location: "2121 Berkeley Way West - Patricia A. Buffler Emeritus Room",
      description: "Coffee Connection networking event."
    },
    {
      id: 92,
      title: "Desk Dynamics: Your Guide to Finding, Setting Up, and Using Height-Adjustable Tables",
      time: "2025-05-21T10:00:00",
      location: "Class of '42, Tang Center",
      description: "Workshop on ergonomic and wellness benefits of height adjustable tables."
    },
    {
      id: 93,
      title: "Post-Baccalaureate Program for Counseling and Psychology Professions Online Information Session",
      time: "2025-05-21T10:00:00",
      location: "Online via Zoom",
      description: "Information session for the Post-Baccalaureate Program for Counseling and Psychology Professions."
    },
    {
      id: 94,
      title: "STEM OPT Document Check Workshop",
      time: "2025-05-21T10:30:00",
      location: "Zoom",
      description: "Workshop for STEM OPT application preparation."
    },
    {
      id: 95,
      title: "Bilateral Assistance from Active Knee Exoskeletons Reduce the Difficulty of Occupational Lifting and Lowering Tasks",
      time: "2025-05-21T12:00:00",
      location: "Warren Hall Room 205A",
      description: "Grace Hunt presents on exoskeletons and occupational lifting."
    },
    {
      id: 96,
      title: "Redwood Seminar: A theory of canonical thalamo-cortical microcircuits for predictive visual inference.",
      time: "2025-05-21T12:00:00",
      location: "Warren Hall Room 205A",
      description: "Dileep George presents on thalamo-cortical microcircuits."
    },
    {
      id: 97,
      title: "Dissertation Talk: Perspectives on Multi-Agent System",
      time: "2025-05-21T12:00:00",
      location: "212 Cory",
      description: "Dissertation talk on multi-agent systems."
    },
    {
      id: 98,
      title: "Sold Out: Arlie Hochschild, Stolen Pride: Loss, Shame, and the Rise of the Right",
      time: "2025-05-21T13:00:00",
      location: "St. Paul's Towers",
      description: "Arlie Russell Hochschild discusses her new book Stolen Pride."
    },
    {
      id: 99,
      title: "Class of 2025 Engineering Master's Degree Commencement",
      time: "2025-05-21T14:00:00",
      location: "Hearst Greek Theatre",
      description: "Commencement ceremony for Master's degree graduates of the College of Engineering."
    },
    {
      id: 100,
      title: "Regulation of mitochondrial biogenesis in neurons",
      time: "2025-05-21T15:00:00",
      location: "125 Li Ka Shing Center",
      description: "Seminar on mitochondrial biogenesis in neurons."
    },
    {
      id: 101,
      title: "Deciphering the anti-oncogenic effect of oncoproteins in the liver",
      time: "2025-05-21T16:00:00",
      location: "114 Morgan Hall",
      description: "Gen-Sheng Feng, UC San Diego, presents on anti-oncogenic effects in liver cancer."
    },
    {
      id: 102,
      title: "Advanced Research on the Science You Learned in High School",
      time: "2025-05-21T17:00:00",
      location: "Zoom",
      description: "Basic Science Lights the Way series: virtual discussions with faculty and students."
    },
    {
      id: 103,
      title: "Toastmasters on Campus: Learn to improve your public speaking skills",
      time: "2025-05-21T18:15:00",
      location: "Zoom",
      description: "Weekly Toastmasters club meeting for public speaking practice."
    }
];

function App() {
  // Remove isLoggedIn state, derive from currentUser
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Can store the Firebase user object
  const [loadingAuth, setLoadingAuth] = useState(true); // State to track initial auth check

  // Lifted state for saved events and ratings
  const [savedEventIds, setSavedEventIds] = useState(() => {
    const saved = localStorage.getItem('savedEventIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Ratings state { eventId: rating }
  const [eventRatings, setEventRatings] = useState(() => {
    const savedRatings = localStorage.getItem('eventRatings');
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  // Lifted effects for localStorage persistence
  useEffect(() => {
    localStorage.setItem('savedEventIds', JSON.stringify(Array.from(savedEventIds)));
  }, [savedEventIds]);

  // Effect for saving ratings
  useEffect(() => {
    localStorage.setItem('eventRatings', JSON.stringify(eventRatings));
  }, [eventRatings]);

  // Listener for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set to user object if logged in, null if logged out
      setLoadingAuth(false); // Auth check is complete
      console.log("Auth state changed, user:", user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once

  // Lifted handler for toggling save status
  const handleToggleSave = (eventId) => {
    setSavedEventIds(prevSavedIds => {
      const newSavedIds = new Set(prevSavedIds);
      if (newSavedIds.has(eventId)) {
        newSavedIds.delete(eventId); // Unsave
      } else {
        newSavedIds.add(eventId); // Save
      }
      return newSavedIds;
    });
  };

  // Lifted handler for rating an event
  const handleRateEvent = (eventId, rating) => {
    setEventRatings(prevRatings => {
      // If the event already has the same rating, set it to 0
      if (prevRatings[eventId] === rating) {
        const newRatings = { ...prevRatings };
        delete newRatings[eventId]; // Remove the rating to set it to 0
        return newRatings;
      }
      // Otherwise, set the new rating
      return {
        ...prevRatings,
        [eventId]: rating
      };
    });
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear local user-specific data if needed (optional)
      // setSavedEventIds(new Set()); 
      // setEventRatings({});
      // setCurrentUser will be set to null by onAuthStateChanged
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle logout errors if necessary
    }
  };

  // Show loading indicator while checking auth state
  if (loadingAuth) {
    return <div className="loading-auth">Checking authentication...</div>; // Add basic styling for this
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route 
            path="/signup"
            element={!currentUser ? <SignUpPage /> : <Navigate to="/dashboard" replace />} 
          />
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard 
                  user={currentUser}
                  events={events} 
                  savedEventIds={savedEventIds} 
                  onToggleSave={handleToggleSave} 
                  eventRatings={eventRatings} 
                  onRateEvent={handleRateEvent}
                  onLogout={handleLogout}
                  themeToggle={<ThemeToggle />}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/saved"
            element={
              currentUser ? (
                <SavedEventsPage 
                  events={events} 
                  savedEventIds={savedEventIds} 
                  onToggleSave={handleToggleSave} 
                  eventRatings={eventRatings} 
                  onRateEvent={handleRateEvent}
                /> 
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
