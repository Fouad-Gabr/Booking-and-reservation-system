import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faLocationDot,
  faWallet,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [workdays, setWorkdays] = useState({
    startWorkDay: "",
    endWorkDay: "",
  });

  const images = [
    "images/num-one.jpg",
    "images/num-two-1.jpg",
    "images/num-two-2.jpg",
    "images/num-three-1.jpg",
    "images/num-three-2.jpg",
    "images/num-4.jpg",
    "images/num-5.jpg",
    "images/num-6.jpg",
    "images/num-7.jpg",
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getDaysBetween = (start, end) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const startIndex = daysOfWeek.indexOf(start);
    const endIndex = daysOfWeek.indexOf(end);

    if (startIndex === -1 || endIndex === -1) return [];

    if (startIndex <= endIndex) {
      return daysOfWeek.slice(startIndex, endIndex + 1);
    } else {
      return [
        ...daysOfWeek.slice(startIndex),
        ...daysOfWeek.slice(0, endIndex + 1),
      ];
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/Workdays")
      .then((response) => {
        const data = response.data;
        if (data && data.startWorkDay && data.endWorkDay) {
          setWorkdays({
            startWorkDay: data.startWorkDay,
            endWorkDay: data.endWorkDay,
          });
        } else {
          console.error("Invalid data structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching workdays data:", error);
      });
  }, []);

  const workDaysRange = getDaysBetween(
    workdays.startWorkDay,
    workdays.endWorkDay
  );

  return (
    <div className="landing pt-4 pb-4">
      <div className="container">
        <div className="Barbershop d-sm-flex justify-content-between pb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">
                <Link to="#">Home : </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="image-boxes">
          <div className="row">
            <div className="col-md-6 col-lg-4 position-relative pb-4 pb-lg-0">
              <img
                src="images/num-one.jpg"
                alt="Barbershop"
                className="img-fluid full-height position-relative  object-fit-cover"
              />
            </div>
            <div className="col-md-6 col-lg-4 pb-4 pb-md-0">
              <div className="two-image d-flex flex-column gap-4">
                <div className="position-relative vurve" data-work="vurve">
                  <img
                    src="images/num-two-1.jpg"
                    alt="Barbershop interior 1"
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src="images/num-two-2.jpg"
                    alt="Barbershop interior 2"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="two-image d-flex flex-column gap-4">
                <div>
                  <img
                    src="images/num-three-1.jpg"
                    alt="Barbershop service 1"
                    className="img-fluid"
                  />
                </div>
                <div className="position-relative">
                  <img
                    src="images/num-three-2.jpg"
                    alt="Barbershop service 2"
                    className="img-fluid"
                  />
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn position-absolute btn-see-all"
                  >
                    See all images
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal d-flex justify-content-center align-items-center position-fixed height-100 width-100">
            <div className="modal-content bg-light p-4 position-relative">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <div className="modal-image-container text-center">
                <img
                  src={images[currentImageIndex]}
                  alt={`image ${currentImageIndex + 1}`}
                  className="img-fluid"
                />
              </div>
              <div className="modal-controls d-flex justify-content-around mt-2">
                <button
                  className="arrow left-arrow"
                  onClick={handlePreviousImage}
                >
                  &lt;
                </button>
                <button className="arrow right-arrow" onClick={handleNextImage}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="business-card mt-4 text-start text-sm-center">
          <div className="align-items-center">
            <div className="d-flex justify-content-between">
              <h4 className="fw-bold">FlexiHealth</h4>
              <div className="d-flex">
                <button className="btn btn-enquire me-2">Enquire</button>
                <button className="btn btn-book-now">Book now</button>
              </div>
            </div>
            <div className="info-shop d-flex pt-3">
              <div className="stars pe-3">
                <span className="me-2">5.0</span>
                {[...Array(4)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="stars"
                  />
                ))}
                <FontAwesomeIcon icon={faStarHalfAlt} className="stars" />
                <span className="ms-2">(196)</span>
              </div>
              <div>
                <span className="business-status pe-3">
                  Closed
                  <span className="ms-1 text-muted dote">
                    opens soon at 9:00am
                  </span>
                </span>
                <span className="dote">MG Road, Cairo</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row business-info">
            <div className="col-md-3 d-flex flex-md-row flex-column text-center text-md-start">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="pe-3 pb-md-0 pb-3"
              />
              <p>
                1st Floor, Cairo Festival City Mall, 11835, 90th Street, New
                Cairo, Cairo, Egypt <br />
                <Link
                  to="https://maps.app.goo.gl/EmVMUkEgzhPmTbRU9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                </Link>
              </p>
            </div>
            <div className="col-md-3 d-flex flex-md-row flex-column text-center text-md-start">
              <FontAwesomeIcon icon={faClock} className="pe-3 pb-md-0 pb-3" />
              <div>
                <p>work days available</p>
                {workDaysRange.length > 0 ? (
                  <p>{workDaysRange.join(", ")}</p>
                ) : (
                  <p>No workdays available</p>
                )}
              </div>
            </div>
            <div className="col-md-3 flex-md-row flex-column text-center text-md-start">
              <p>Closed</p>
              <p>10:00 am - 07:30 pm</p>
            </div>
            <div className="col-md-3 d-flex flex-md-row flex-column text-center text-md-start">
              <FontAwesomeIcon icon={faWallet} className="pe-3 pb-md-0 pb-3" />
              <div>
                <p>Mode of payment</p>
                <p>Cash, Debit Card, Credit Card, UPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
