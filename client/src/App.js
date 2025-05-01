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
