"use client"; // Required for Next.js App Router

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CustomCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) =>
        setEvents(
          data.items.map((event) => ({
            title: event.summary,
            start: event.start.dateTime || event.start.date,
            end: event.end?.dateTime || event.end?.date,
          }))
        )
      );
  }, []);

  return (
    <div className="p-4 border rounded shadow">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
}
