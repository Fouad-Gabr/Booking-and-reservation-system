import "./BookingDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
            <span className="price">INR {price}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>INR {price}</span>
          </div>
        </div>
      </div>
      {showButton && (
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={onNextClick}
          disabled={nextButtonDisabled}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon ms-3" />
        </button>
      )}
    </>
  );
};

export default BookingDetails;
