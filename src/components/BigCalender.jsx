import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./MyCalendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const BigCalender = () => {
  const [events, setEvents] = useState([
    { title: "event 1", start: new Date(), end: new Date() },
    { title: "event 2", start: new Date(), end: new Date() },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleSelectEvent = (event) => {
    const confirmDelete = window.confirm(
      `Do you want to delete "${event.title}"?`
    );
    if (confirmDelete) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        popup
      />
    </div>
  );
};

export default BigCalender;
