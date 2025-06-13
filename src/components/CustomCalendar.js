"use client"; // Required for Next.js App Router

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { formatDate, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CustomCalendar() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([]);

  const handleCloseDialog = () =>{
    setIsDialogOpen(false)
    setNewEventTitle("")
  }
  const handleDateClick = (selected) => {
    setSelectedDate(selected)
    setIsDialogOpen(true)
  }
  const handleEventDelete = (selected) =>{
    if(window.confirm(`Are you sure you want to delete the event "${selected.event.title}"? `
    )
  ){
    selected.event.remove()
  }
  }

  const handleAddEvent = (e) =>{
      e.preventDefault()
      if(newEventTitle && selectedDate){
        const calendarApi = selectedDate.view.calendar
        calendarApi.unselect();
        const newEvent ={
          id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
          title: newEventTitle,
          start:selectedDate?.start,
          end:selectedDate?.end,
          allDay:selectedDate?.allDay
        }
        calendarApi.addEvent(newEvent)
        handleCloseDialog()
      }
  }

  useEffect(() => {
if(typeof window !== "undefined"){
  const savedEvents= localStorage.getItem("events")
  if(savedEvents) {
    setCurrentEvents(JSON.parse(savedEvents))
  }
}
  }, [])
  

  useEffect(() => {
    if(typeof window!== "undefined"){
      localStorage.setItem("events",JSON.stringify(currentEvents))
    }
  }, [currentEvents])

  return (
    <div className="p-4 border rounded shadow">
      <FullCalendar 
      height={"85vh"} 
      plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]} 
      initialView="dayGridMonth" events={events}
      headerToolbar={{left: "prev,next today", center:"title", right:"dayGridMonth, timeGridWeek, timeGridDay, AddNewEvent"}}
          customButtons={{
        AddNewEvent: {
          text: "Add New",
          click: () => {handleDateClick}
        }
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      droppable={true}
      select={handleDateClick}
      eventClick={handleEventDelete}
      eventsSet={(events) => setCurrentEvents(events)}
      initialEvents={typeof window!== "undefined" ? JSON.parse(localStorage.getItem("events") || "[]") : []}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
           <form
      className="flex flex-col gap-4 min-h-20 justify-center items-center w-full"
      onSubmit={handleAddEvent}>
      <input
        type="text"
        placeholder="Event Title"
        value={newEventTitle}
        onChange={(e) => setNewEventTitle(e.target.value)}
        required
        className="border border-gray-200 p-3 rounded-md text-lg w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white w-full p-3 rounded-md"
      >
        Add
      </button>
    </form> 
        </DialogContent>
      </Dialog>
    </div>
  );
}
