import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Reuse general App styles

// Component to display only the saved events
function SavedEventsPage({ events, savedEventIds, onToggleSave }) {

  // Filter the main events list to get only the saved ones
  const savedEvents = events.filter(event => savedEventIds.has(event.id));

  return (
    <>
      {/* Simple header for this page */}
      <header className="app-header">
        <h1>Saved Events</h1>
        <Link to="/dashboard" className="nav-link">Back to Dashboard</Link> 
      </header>

      <main className="main-content saved-events-content"> {/* Add specific class */} 
        {savedEvents.length > 0 ? (
          <div className="event-list"> {/* Reuse event list styling */} 
            {savedEvents.map(event => {
              const isSaved = true; // All events here are saved
              return (
                <div key={event.id} className={`event-card saved`}> 
                  <h2>{event.title}</h2>
                  <p>{event.description || 'No description available.'}</p>
                  <div className="event-details">
                    {event.time && <span><strong>Time:</strong> {new Date(event.time).toLocaleString()}</span>}
                    {event.location && <span><strong>Location:</strong> {event.location}</span>}
                  </div>
                  <div className="event-actions">
                    {/* Use the passed-down toggle function */}
                    <button 
                      onClick={() => onToggleSave(event.id)} 
                      className={`save-button saved`}
                    >
                      Unsave
                    </button>
                    <button disabled>Rate</button> {/* Disable Rate button here for now */}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-saved-message">You haven't saved any events yet. Go back to the dashboard to find some!</p>
        )}
      </main>

      {/* Simple footer */}
      <footer className="app-footer">
        <p>© 2024 EventFull. All rights reserved.</p>
      </footer>
    </>
  );
}

export default SavedEventsPage; 