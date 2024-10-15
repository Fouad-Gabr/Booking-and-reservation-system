
import './Booking.css';

export default function Booking({ bookerName, service, bookingDate, bookingTime }) {
    return (
        <div className="booking-card">
            <p><strong>{bookerName}</strong></p>
            <p>{service}</p>
            <p>Date: {bookingDate}</p>
            <p>Time: {bookingTime}</p>
            <div className="action-buttons">
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
}
