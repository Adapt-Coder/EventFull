import React from 'react';
import './App.css'; // We'll create this file next

function App() {
  // Placeholder for event data
  const events = [
    {
      id: 1,
      title: "Campus Tech Meetup",
      description: "Join us for the latest in tech innovations.",
      time: "2024-08-15T18:00:00",
      location: "Engineering Building, Room 101",
      rating: 4.5
    },
    {
      id: 2,
      title: "Art Exhibition Opening",
      description: "Discover stunning works by local artists.",
      time: "2024-08-16T19:00:00",
      location: "Fine Arts Gallery",
      rating: 4.8
    },
    {
      id: 3,
      title: "Outdoor Movie Night",
      description: "Enjoy a classic film under the stars.",
      time: "2024-08-17T20:30:00",
      location: "Central Quad",
      rating: 4.2
    },
    {
        id: 4,
        title: "Guest Lecture: AI in Healthcare",
        description: "Explore the impact of AI on modern medicine.",
        time: "2024-08-18T15:00:00",
        location: "Science Hall Auditorium",
        rating: 4.9
    },
    {
        id: 5,
        title: "Student Music Festival",
        description: "Live performances by student bands and musicians.",
        time: "2024-08-19T17:00:00",
        location: "Amphitheater",
        rating: 4.6
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>EventFull</h1>
        {/* Placeholder for User Profile/Login Button */}
        <button className="login-button">Login</button>
      </header>

      <main className="main-content">
        <aside className="filters-sidebar">
          <h2>Filters</h2>
          {/* Placeholder for filter options */}
          <div className="filter-group">
            <label htmlFor="date-filter">Date</label>
            <input type="date" id="date-filter" />
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
          {/* Add more filters as needed */}
        </aside>

        <section className="event-list-section">
          <div className="search-bar">
            <input type="text" placeholder="Search events..." />
            <button>Search</button>
          </div>
          <div className="event-list">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div className="event-details">
                  <span><strong>Time:</strong> {new Date(event.time).toLocaleString()}</span>
                  <span><strong>Location:</strong> {event.location}</span>
                  <span><strong>Rating:</strong> {event.rating} ★</span>
                </div>
                <div className="event-actions">
                  <button>Save</button>
                  <button>Rate</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 EventFull. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
