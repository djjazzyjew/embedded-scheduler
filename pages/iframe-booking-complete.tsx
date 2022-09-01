import { useEffect, useState } from "react"
import type { NextPage } from "next";
import { request } from "http";

const About : NextPage = () => {

  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if(timeLeft===0){
       setTimeLeft(null)
    }

    // exit early when we reach 0
    if (!timeLeft) {
      const redirectUrl = "http://localhost:3000"
      var pairs = location.search.slice(1).split('&');
    
      var result = {};
      pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
      });

      const data = JSON.parse(JSON.stringify(result));
      data.additional_values = JSON.parse(data.additional_values);
      parent.postMessage({ bookingSuccess: true, responseData: data }, redirectUrl)
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);


  return (<div className="container">
  <h1>Booking Successful</h1>
  <p>
    This window will close in <span className="count">{timeLeft}</span>
  </p>
</div>)
}

export default About
