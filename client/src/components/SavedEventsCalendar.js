import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './SavedEventsCalendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function SavedEventsCalendar({ events, savedEventIds }) {
  // Filter events to only include saved ones
  const savedEvents = events.filter(event => savedEventIds.has(event.id));

  // Transform events into the format required by react-big-calendar
  const calendarEvents = savedEvents.map(event => ({
    title: event.title,
    start: new Date(event.time),
    end: new Date(new Date(event.time).getTime() + 60 * 60 * 1000), // Default 1 hour duration
    allDay: event.isAllDay || false,
    resource: event
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#e94560',
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
          },
        })}
      />
    </div>
  );
}

export default SavedEventsCalendar; 