import { useState, useRef } from "react";
import "./TimeSelection.css";

const TimeSelection = ({
  times,
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const dayContainerRef = useRef(null);

  const getDaysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = [];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(
    new Date(new Date().getFullYear(), currentMonthIndex)
  );
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
  };

  const scrollLeft = () => {
    if (dayContainerRef.current) {
      dayContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (dayContainerRef.current) {
      dayContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="time-selection card p-3 border-light">
      <h3 className="fw-bold">Select Time</h3>

      <div className="d-flex justify-content-between align-items-center mb-3 fw-bold">
        <button className="btn btn-secondary" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div>
          {new Date(new Date().getFullYear(), currentMonthIndex).toLocaleString(
            "default",
            { month: "long" }
          )}
        </div>
        <button className="btn btn-secondary" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>

      <div className="d-flex align-items-center">
        <button className="btn btn-secondary" onClick={scrollLeft}>
          &lt;
        </button>
        <div
          className="d-flex overflow-hidden flex-nowrap day-selection"
          ref={dayContainerRef}
        >
          {days.map((day) => {
            const dayName = dayNames[day.getDay()];
            const isSelected =
              selectedDate.getDate() === day.getDate() &&
              selectedDate.getMonth() === day.getMonth() &&
              selectedDate.getFullYear() === day.getFullYear();

            return (
              <div key={day} className="text-center mx-2">
                <div
                  className={`border rounded p-2 text-center day-box ${
                    isSelected ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(day);
                  }}
                  style={{ width: "60px", cursor: "pointer" }}
                >
                  <div className="fw-bold">{dayName}</div>
                  <div>{day.getDate()}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-secondary" onClick={scrollRight}>
          &gt;
        </button>
      </div>

      <div className="date-list mt-3">
        {times.map((timeSlot, index) => (
          <button
            key={index}
            className={`btn btn-light m-1 time-slot p-3 ${
              selectedTime === timeSlot ? "selected" : ""
            }`}
            onClick={() => setSelectedTime(timeSlot)}
          >
            {timeSlot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
