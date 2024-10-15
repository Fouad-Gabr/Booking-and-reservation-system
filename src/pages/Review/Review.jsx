import "bootstrap/dist/css/bootstrap.min.css";
import BookingDetails from "../../components/BookingDetails/BookingDetails";
import "./Review.css";

function Review() {
  return (
    <div className="review">
      <div className="container mt-3 ">
        <p>Step 3 of 3:</p>
        <h3 className="fw-bold">Review and confirm</h3>
        <div className="row">
          <div className="col-md-9 ">
            <div className="border-light p-4 rounded bg-body">
              <p className="fw-bold">Cancellation policy</p>
              <p className="mb-4">
                Cancel for free anytime in advance, otherwise you will be
                charged
                <br />
                <strong className=""> 100% </strong> of the service price for
                not showing up.
              </p>
              <div className="form-group">
                <label htmlFor="bookingNotes" className="mb-2 fw-bold">
                  Add booking notes
                </label>
                <p>Include comments or requests about your booking</p>
                <textarea
                  className="form-control"
                  id="bookingNotes"
                  rows="6"
                  placeholder=" comments "
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-md-3 pt-3 pt-md-0">
            <BookingDetails
              location="Vurve - shara "
              service="Haircut - Premier Stylist"
              price="900"
              dateTime="Sun 16 July 2023 at 5:00pm"
              duration="1h duration, ends at 6:00pm"
              showDateTime={true}
              showButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
