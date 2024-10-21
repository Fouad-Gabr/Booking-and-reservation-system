import "./AdminDashboard.css";
import Booking from "../../components/Booking/Booking";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [reviews, setReviews] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editServiceId, setEditServiceId] = useState(null);

  useEffect(() => {
    if (activeTab === "reviews") {
      axios
        .get("http://localhost:5001/reviews")
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "services") {
      axios
        .get("http://localhost:5001/services")
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "bookings") {
      axios
        .get("http://localhost:5001/bookings")
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const newService = {
      name: serviceName,
      cost: servicePrice,
    };

    if (editServiceId) {
      axios
        .put(`http://localhost:5001/services/${editServiceId}`, newService)
        .then((response) => {
          setServices(
            services.map((service) =>
              service.id === editServiceId ? response.data : service
            )
          );

          setServiceName("");
          setServicePrice("");
          setEditServiceId(null);
        })
        .catch((error) => {
          console.error("Error updating service:", error);
        });
    } else {
      axios
        .post("http://localhost:5001/services", newService)
        .then((response) => {
          setServices([...services, response.data]);
          setServiceName("");
          setServicePrice("");
        })
        .catch((error) => {
          console.error("Error adding service:", error);
        });
    }
  };

  const handleDeleteService = (serviceId) => {
    axios
      .delete(`http://localhost:5001/services/${serviceId}`)
      .then(() => {
        setServices(services.filter((service) => service.id !== serviceId));
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
      });
  };

  const handleUpdateService = (serviceId) => {
    const serviceToEdit = services.find((service) => service.id === serviceId);
    if (serviceToEdit) {
      setServiceName(serviceToEdit.name);
      setServicePrice(serviceToEdit.cost);
      setEditServiceId(serviceId);
    }
  };

  const handleCancelBooking = (bookingId) => {
    axios
      .delete(`http://localhost:5001/bookings/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
      });
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Admin Dashboard</h2>
          <div className="my-4">
            <h4>Total Bookings: {bookings.length}</h4>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => handleTabChange("bookings")}
            >
              Bookings
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "services" ? "active" : ""}`}
              onClick={() => handleTabChange("services")}
            >
              Services
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "bookings" && (
            <div className="row">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div
                    className="col-md-3 mb-3 d-flex flex-column"
                    key={booking.id}
                  >
                    <Booking
                      bookerName={booking.bookerName}
                      service={booking.service}
                      bookingDate={booking.bookingDate}
                      bookingTime={booking.bookingTime}
                    />
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </div>
                ))
              ) : (
                <div>No bookings available</div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="row">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="col-md-4 mb-3" key={review.id}>
                    <ReviewCard
                      userName={review.user}
                      review={review.review}
                      rating={review.rating}
                      title={review.title}
                    />
                  </div>
                ))
              ) : (
                <div>No reviews available</div>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div>
              <form onSubmit={handleServiceSubmit}>
                <div className="mb-3">
                  <label className="form-label">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Service Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editServiceId ? "Update Service" : "Add Service"}
                </button>
              </form>

              <h3 className="mt-4">Current Services</h3>
              <ul className="list-group">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{service.name}</strong> - ${service.cost}
                    </div>
                    <div>
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => handleUpdateService(service.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
