const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Use port 3001 for the backend
const EVENTS_URL = 'https://events.berkeley.edu/';

// Enable CORS for all routes
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EventFull Backend is running!');
});

// Route to scrape and return events
app.get('/api/events', async (req, res) => {
  try {
    const { data } = await axios.get(EVENTS_URL);
    const $ = cheerio.load(data);
    const events = [];

    // Scraping logic - This will depend heavily on the structure of events.berkeley.edu
    // Inspect the page source (e.g., using browser dev tools) to find the correct selectors
    // Example selectors (these NEED verification and likely adjustment):
    $('.event-item').each((index, element) => { // Use the correct selector for event containers
      const title = $(element).find('.event-title a').text().trim(); // Adjust selector
      const description = $(element).find('.event-description').text().trim(); // Adjust selector
      const time = $(element).find('.event-time').attr('datetime'); // Adjust selector/attribute
      const location = $(element).find('.event-location').text().trim(); // Adjust selector
      const url = $(element).find('.event-title a').attr('href'); // Adjust selector

      // Basic validation
      if (title && time) {
        events.push({
          id: index, // Using index as a temporary ID
          title,
          description: description || 'No description available.',
          time, // Keep the raw datetime string or parse if needed
          location: location || 'Location not specified',
          url: url ? new URL(url, EVENTS_URL).href : '#', // Construct absolute URL if relative
          // Add other fields like rating later
          rating: null // Placeholder for rating
        });
      }
    });

    console.log(`Scraped ${events.length} events.`);
    res.json(events);

  } catch (error) {
    console.error('Error scraping events:', error);
    res.status(500).json({ error: 'Failed to scrape events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 