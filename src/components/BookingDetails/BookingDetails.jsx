import React, { useState } from 'react';
import "./BookingDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const BookingDetails = ({
  location,
  service,
  price,
  duration,
  dateTime,
  showDateTime,
  showButton,
  onNextClick,
  nextButtonDisabled,
  year,
  month,
  day,
  timeSlot,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(''); // State to manage feedback messages

  const handlePayPalCheckout = async () => {
    // Check if the button is already loading
    if (isLoading) {
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      const items = [
        {
          name: service, // Using the service prop
          description: `${service}`, // Assuming the description is based on the service
          quantity: 1,
          unit_amount: {
            currency_code: "USD",
            value: price.toString(),
          },
        },
      ];

      // Create PayPal order only when the button is pressed
      const response = await axios.post('/paypal/create-order', { items, cost: price });
      window.location.href = response.data.approvalUrl; // Redirect to PayPal approval URL
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setMessage("There was an error creating your PayPal order. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleCashCheckout = async () => {
    // Check if the button is already loading
    if (isLoading) {
      return;
    }

    setIsLoading(true); // Set loading state

    // Construct the request body
    const appointmentData = {
      year: year,
      month: month, // Months are 0-based
      day: day,
      timeSlot: timeSlot, // Assuming this is the desired format
      user: { /* user information */ }, //user id, get it from token, also when the auth is finished we would have access token to acces the api
      service: service,
      cost: price,
      note: "Paying with cash", // You can modify this note as needed
    };

    try {
      // Send a POST request to create the appointment
      const response = await axios.post('/appointments', appointmentData);
      // Handle the response as needed (e.g., display success message, redirect, etc.)
      setMessage("Appointment created successfully!");
      // Optionally, redirect or perform other actions
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage("There was an error creating your appointment. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="card booking-card border-light w-sm-100 border">
        <div className="image-and-location d-flex align-items-center justify-content-around p-2">
          <img src="images/service-details.jpg" className="img-fluid book-details-img" alt="Service" />
          <h5 className="card-title">{location}</h5>
        </div>
        <div className="card-body pt-0">
          <hr />
          {showDateTime && (
            <div className="mb-3">
              <strong>{dateTime}</strong>
              <p className="text-muted">{duration}</p>
              <hr />
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <span className="service">{service}</span>
            <span className="price">USD {price}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>USD {price}</span>
          </div>
        </div>
      </div>
      {showButton && (
        <>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={onNextClick}
            disabled={nextButtonDisabled}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon ms-3" />
          </button>
          <button
            className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'} w-100 mt-3`}
            onClick={handlePayPalCheckout}
            disabled={nextButtonDisabled || isLoading} 
          >
            {isLoading ? 'Processing...' : 'Check out with PayPal'}
          </button>
          <button
            className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'} w-100 mt-3`}
            onClick={handleCashCheckout}
            disabled={nextButtonDisabled || isLoading} 
          >
            {isLoading ? 'Processing...' : 'Pay with cash and check out'}
          </button>
          {message && <div className="mt-3 text-danger">{message}</div>} {/* Error message */}
        </>
      )}
    </>
  );
};

export default BookingDetails;
