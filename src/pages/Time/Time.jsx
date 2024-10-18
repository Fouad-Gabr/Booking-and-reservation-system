import { useState, useEffect } from "react";
import axios from "axios";
import TimeSelection from "../../components/TimeSelection/TimeSelection";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Time.css";

const Time = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAvailableTimes = async () => {
    try {
      const response = await axios.get("/api/times");
      setTimes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postBookingDetails = async () => {
    try {
      const response = await axios.post("/api/booking", {
        time: selectedTime,
        date: selectedDate,
      });

      if (response.status === 200) {
        setMessage("Booking successful!");
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAvailableTimes();
  }, []);

  return (
    <div className="time">
      <div className="container mt-4">
        <p>Step 2 of 3:</p>
        <h3 className="fw-bold">Select Time</h3>
        <div className="row">
          <div className="col-md-9">
            <TimeSelection
              times={times}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="col-md-3">
            <BookingDetails
              location="Vurve - Bangalore"
              service="Haircut - Premier Stylist"
              price="900"
              showButton={true}
              onSubmit={postBookingDetails}
            />
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
