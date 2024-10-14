import "./Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faStarHalfAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChartLine,
  faClock,
  faLocationDot,
  faWallet,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="landing pt-4 pb-4">
      <div className="container">
        <div className="Barbershop d-sm-flex justify-content-between pb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Barbershops</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Bangalore</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Vurve
              </li>
            </ol>
          </nav>
          <button className="btn btn-custom">Barbershop</button>
        </div>
        <div className="image-boxes">
          <div className="row">
            <div className="col-md-6 col-lg-4 position-relative pb-4 pb-lg-0">
              <img
                src="../../../public/images/1f67aafe842a79082827d95cb155510a.jpeg"
                alt="Barbershop"
                className="img-fluid full-height position-relative"
              />
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="position-absolute"
              />
            </div>
            <div className="col-md-6 col-lg-4 pb-4 pb-md-0">
              <div className="two-image d-flex flex-column gap-4">
                <div className="position-relative vurve" data-work="vurve">
                  <img
                    src="../../../public/images/2-1.jpeg"
                    alt="Barbershop interior 1"
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src="../../../public/images/2-2.jpeg"
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
                    src="../../../public/images/3-1.jpeg"
                    alt="Barbershop service 1"
                    className="img-fluid"
                  />
                </div>
                <div className="position-relative">
                  <img
                    src="../../../public/images/3-2.jpeg"
                    alt="Barbershop service 2"
                    className="img-fluid"
                  />
                  <Link to="#" className="btn position-absolute btn-see-all">
                    See all image
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="business-card mt-4 text-start text-sm-center">
          <div className="align-items-center">
            <div className="d-flex justify-content-between">
              <h4 className="fw-bold">Vurve - Bangalore</h4>
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
                <span className="dote"> MG Road, Bangalore</span>
              </div>
              <p className="text-muted ms-md-auto">
                <FontAwesomeIcon icon={faChartLine} /> 15 people recently
                enquired
              </p>
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
                1st Floor, Icon Mall, 2981, 12th Main Rd, Indiranagar,
                Bengaluru, Karnataka 560008 <br />
                <Link to="#">Get directions</Link>
              </p>
            </div>
            <div className="col-md-3 d-flex flex-md-row flex-column text-center text-md-start">
              <FontAwesomeIcon icon={faClock} className="pe-3 pb-md-0 pb-3" />
              <div>
                <p>Mon</p>
                <p>Tue - Sun</p>
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
