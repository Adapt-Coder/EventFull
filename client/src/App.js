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
import './App.css'; // Keep global styles if needed

// Define events data outside the component or fetch it if needed
const events = [
    // April 10, 2025
    {
      id: 1,
      title: "BCNM 20th Anniversary Alumni Conference",
      time: "2025-04-10T09:00:00",
      location: "Banatao Auditorium, 310 Sutardja Dai Hall",
      description: "Celebrating the work of Berkeley Center for New Media alumni."
    },
    // ... (INSERT THE REST OF THE ~100+ EVENT OBJECTS HERE) ...
    {
        id: 118,
        title: "Steeped in Time: The Past & Present of Assam Tea",
        time: "2025-04-13T09:00:00", // All Day
        location: "120 Doe Library (South/Southeast Asia Library)",
        description: "A curated exhibition that traces the enduring legacy and evolving future of Assam tea."
    },
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
    setEventRatings(prevRatings => ({
      ...prevRatings,
      [eventId]: rating
    }));
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
    <Router>
      {/* Removed the outer app-container div from here, as components handle their layout */}
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        {/* Add Sign Up route */}
        <Route 
          path="/signup"
          element={!currentUser ? <SignUpPage /> : <Navigate to="/dashboard" replace />} 
        />
        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard 
                user={currentUser} // Pass the whole user object or specific fields like email
                events={events} 
                savedEventIds={savedEventIds} 
                onToggleSave={handleToggleSave} 
                eventRatings={eventRatings} 
                onRateEvent={handleRateEvent}
                onLogout={handleLogout} // Pass logout handler
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Add Saved Events route */}
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
        {/* Remove About route */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        
        {/* Redirect root path */}
        <Route
          path="/"
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        {/* Optional 404 route */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
