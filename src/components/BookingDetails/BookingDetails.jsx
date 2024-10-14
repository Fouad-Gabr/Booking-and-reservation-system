import "./BookingDetails.css";

const BookingDetails = ({ location, service, price }) => {
  return (
    <>
      <div className="card booking-card border-light">
        <div className="image-and-location d-flex align-items-center justify-content-around p-2">
          <img src="images/2-1.jpeg" alt="Service" className="w-50" />
          <h5 className="card-title">{location}</h5>
        </div>
        <div className="card-body">
          <hr />
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="service">{service}</span>
              <span className="price">INR {price}</span>
            </div>
            <span> 1 H</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>INR {price}</span>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-100">Next</button>
    </>
  );
};

export default BookingDetails;
