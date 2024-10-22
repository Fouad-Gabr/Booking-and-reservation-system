import "./AdminDashboard.css";
import Booking from "../../components/Booking/Booking";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [reviews, setReviews] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [editServiceId, setEditServiceId] = useState(null);
  const [startWorkDay, setstartWorkDay] = useState("");
  const [endWorkDay, setendWorkDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
          setFilteredBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Workdays") {
      axios
        .get("http://localhost:5001/Workdays")
        .then((response) => {
          const { startWorkDay, endWorkDay } = response.data;
          setstartWorkDay(startWorkDay);
          setendWorkDay(endWorkDay);
        })
        .catch((error) => {
          console.error("Error fetching clinic Days:", error);
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
          toast.success("Service updated successfully!");
          setServiceName("");
          setServicePrice("");
          setEditServiceId(null);
        })
        .catch((error) => {
          console.error("Error updating service:", error);
          toast.error("Failed to update service!");
        });
    } else {
      axios
        .post("http://localhost:5001/services", newService)
        .then((response) => {
          setServices([...services, response.data]);
          toast.success("Service added successfully!");
          setServiceName("");
          setServicePrice("");
        })
        .catch((error) => {
          console.error("Error adding service:", error);
          toast.error("Failed to add service!");
        });
    }
  };

  const handleDeleteService = (serviceId) => {
    axios
      .delete(`http://localhost:5001/services/${serviceId}`)
      .then(() => {
        setServices(services.filter((service) => service.id !== serviceId));
        toast.success("Service deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service!");
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
        setFilteredBookings(
          filteredBookings.filter((booking) => booking.id !== bookingId)
        );
        toast.success("Booking canceled successfully!");
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        toast.error("Failed to cancel booking!");
      });
  };

  const handleWorkdaysSubmit = (e) => {
    e.preventDefault();
    const updatedDays = {
      startWorkDay,
      endWorkDay,
    };

    axios
      .put("http://localhost:5001/Workdays", updatedDays)
      .then(() => {
        toast.success("Clinic Days updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating clinic Days:", error);
        toast.error("Failed to update clinic Days!");
      });
  };

  const fetchFilteredBookings = () => {
    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      const bookingMonth = bookingDate.getMonth() + 1;
      const bookingYear = bookingDate.getFullYear();
      return bookingMonth === parseInt(month) && bookingYear === parseInt(year);
    });
    setFilteredBookings(filtered);
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Admin Dashboard</h2>
          <div className="my-4">
            <h4>Total Bookings: {filteredBookings.length}</h4>
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
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Workdays" ? "active" : ""}`}
              onClick={() => handleTabChange("Workdays")}
            >
              Clinic Days
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "bookings" && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchFilteredBookings();
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Month</label>
                  <input
                    type="number"
                    className="form-control"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Enter month (1-12)"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Fetch Bookings
                </button>
              </form>

              <div className="row mt-4">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
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
                  <div>No bookings available for this month and year</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="row">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="col-md-4 mb-3" key={review.id}>
                    <ReviewCard
                      userName={review.userName}
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

              <h4 className="mt-4">Available Services</h4>
              <ul className="list-group">
                {services.map((service) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={service.id}
                  >
                    {service.name} - ${service.cost}
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleUpdateService(service.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
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

          {activeTab === "Workdays" && (
            <div>
              <form onSubmit={handleWorkdaysSubmit}>
                <div className="mb-3">
                  <label className="form-label">Open Day</label>
                  <select
                    className="form-control"
                    value={startWorkDay}
                    onChange={(e) => setstartWorkDay(e.target.value)}
                    aria-placeholder="Select Open Day"
                    required
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Close Day</label>
                  <select
                    className="form-control"
                    value={endWorkDay}
                    onChange={(e) => setendWorkDay(e.target.value)}
                    aria-placeholder="Select Close Day"
                    required
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Workdays
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
