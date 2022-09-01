import React, { useEffect } from "react";

export default function Event(props) {
  useEffect(function mount() {
    function onEvent(event) {
      // Necessary security check, should match your back end origin, do not remove
      if (event.origin !== "http://localhost:3000")
        return
      
      if(event.data.bookingSuccess) {
        props.setBookingComplete(true)
        props.setBookingInfo(event.data)
      }
    }

    if(typeof window == null){
      console.log("no window");
    }

    window.addEventListener("message",
      (event) => onEvent(event),
      false
    );

    return function unMount() {
      window.removeEventListener("message", onEvent);
    };
  });

  return null;
}
