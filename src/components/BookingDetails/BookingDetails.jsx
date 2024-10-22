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
            currency_code: "USD", // Assuming the currency code is INR based on your earlier example
            value: price.toString(), // Convert price to string
          },
        },
      ];

      // Create PayPal order only when the button is pressed
      const response = await axios.post('/paypal/create-order', { items, cost: price });
      window.location.href = response.data.approvalUrl; // Redirect to PayPal approval URL
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setMessage("There was an error creating your PayPal order. Please try again."); // Update message state
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
            className="btn btn-primary w-100 mt-3"
            onClick={onNextClick}
            disabled={nextButtonDisabled}
          >
            Pay with cash and check out
          </button>
          {message && <div className="mt-3 text-danger">{message}</div>} {/* Paypal error*/}
        </>
      )}
    </>
  );
};

export default BookingDetails;
