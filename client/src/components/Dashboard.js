import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import StarRating from './StarRating';

// Renamed App to Dashboard
function Dashboard({ user, events, savedEventIds, onToggleSave, eventRatings, onRateEvent, onLogout }) {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Handlers for filters remain the same
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
        <h1>EventFull Dashboard</h1>
        <div className="user-info">
          {user && (
            <Link to="/saved" className="username-link">
              <span className="username-display">{user.email || 'My Saved Events'}</span>
            </Link>
          )}
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
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
              filteredEvents.map(event => {
                const isSaved = savedEventIds.has(event.id);
                const currentRating = eventRatings[event.id] || 0;
                return (
                  <div key={event.id} className={`event-card ${isSaved ? 'saved' : ''}`}>
                    <h2>{event.title}</h2>
                    <p>{event.description || 'No description available.'}</p>
                    <div className="event-details">
                      {event.time && <span><strong>Time:</strong> {new Date(event.time).toLocaleString()}</span>}
                      {event.location && <span><strong>Location:</strong> {event.location}</span>}
                    </div>
                    <div className="event-actions">
                      <button 
                        onClick={() => onToggleSave(event.id)}
                        className={`save-button ${isSaved ? 'saved' : ''}`}
                      >
                        {isSaved ? 'Unsave' : 'Save'}
                      </button>
                      <StarRating 
                        rating={currentRating}
                        onRate={onRateEvent}
                        eventId={event.id}
                      />
                    </div>
                  </div>
                );
              })
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