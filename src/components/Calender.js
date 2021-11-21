import React, { useState } from 'react';
import eventlist from "./events";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const Calender = (props) => {
    const {eventlist,updateDate} = props;
   
    const [events, setEvents] = useState([...eventlist]);

    const moveEvent = ({ event, start, end }) => {
         const idx = events.indexOf(event);   
         const updatedEvent = { ...event, start, end }; 
         const nextEvents = [...events];          
         updateDate(updatedEvent.id,updatedEvent.start)     
         nextEvents.splice(idx, 1, updatedEvent);
         setEvents(nextEvents);
    }


    return (
        <div style={{height : 600}}>
            <DragAndDropCalendar
                selectable
                events={events}
                onEventDrop={moveEvent}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()} 
                views={['month']}
            /> 
           
        </div>
    )
}

export default DragDropContext(HTML5Backend)(Calender)
