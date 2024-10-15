import { useState } from "react";
import TimeSelection from "../../components/TimeSelection/TimeSelection";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Time.css";

const Time = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const times = [
    "9:00 pm",
    "4:45 pm",
    "5:00 pm",
    "5:15 pm",
    "5:30 pm",
    "5:45 pm",
    "6:00 pm",
    "8:00 pm",
  ];

  return (
    <div className="time">
      <div className="container mt-4">
        <p>Step 2 of 3: Select time</p>
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
            <BookingDetails location="Vurve " service="Haircut " price={900} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
