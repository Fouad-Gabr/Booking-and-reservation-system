import './AdminDashboard.css';
import Booking from '../../components/Booking/Booking';
import Review from '../../components/Review/Review';
export default function AdminDashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-main-info">
                
                <div className="dashboard-title">
                    <h2>Dashboard</h2>
                    <p>Welcome Back!</p>
                </div>

                <div className="quick-stats-container">
                    <p className="quickstats-header">Quick Stats</p>
                    <div className="quickstats">
                        <div className="stat-box">
                            <h3>Total Bookings</h3>
                            <p>28,345</p>
                        </div>
                    </div>
                    <div className="quickstats">
                        <div className="stat-box">
                            <h3>Total Earnings</h3>
                            <p>30,000 EGP$</p>
                        </div>
                    </div>
                </div>

                <div className="bookings-reviews-container">
                    <div className="booking-reviews-selection">
                        <h3 className="active" id='select-bookings'>Bookings</h3>
                        <h3 id='select-reviews'>Reviews</h3>
                    </div>
                    <div className="bookings">
                        <Booking
                            bookerName="Amanda Chavez"
                            service="Physiotherapy"
                            bookingDate="25 Jul 2020"
                            bookingTime="11:00 - 12:00"
                        />
                        <Booking
                            bookerName="Fionna Wade"
                            service="Physiotherapy"
                            bookingDate="25 Jul 2020"
                            bookingTime="11:00 - 12:00"
                        />
                        <Booking
                            bookerName="Amanda Chavez"
                            service="Physiotherapy"
                            bookingDate="25 Jul 2020"
                            bookingTime="11:00 - 12:00"
                        />
                        <Booking
                            bookerName="Fionna Wade"
                            service="Physiotherapy"
                            bookingDate="25 Jul 2020"
                            bookingTime="11:00 - 12:00"
                        />
                        <Booking
                            bookerName="Amanda Chavez"
                            service="Physiotherapy"
                            bookingDate="25 Jul 2020"
                            bookingTime="11:00 - 12:00"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
