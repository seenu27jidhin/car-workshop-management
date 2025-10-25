import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-box logo-box">
          <div className="footer-logo">
            <FontAwesomeIcon
              icon={faCarSide}
              style={{
                backgroundColor: 'rgb(246, 205, 26)',
                borderRadius: '25px',
                width: '30px',
                height: '30px',
                fontSize: '20px',
                color: 'black',
                padding: '10px',
              }}
            />
            <h2>Car Workshop</h2>
          </div>

          <p>
            We help to repair, service and maintain your car. Trust us to keep
            you running smoothly.
          </p>
          <div class="social-icons">
            <a href="">
              <FontAwesomeIcon
                icon={faFacebook}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  width: '15px',
                  height: '15px',
                  fontSize: '20px',
                  color: 'rgb(246, 205, 26)',
                  padding: '5px',
                }}
              />
            </a>
            <a href="">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  width: '15px',
                  height: '15px',
                  fontSize: '10px',
                  color: 'rgb(246, 205, 26)',
                  padding: '5px',
                }}
              />
            </a>
            <a href="">
              <FontAwesomeIcon
                icon={faTwitter}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  width: '15px',
                  height: '15px',
                  fontSize: '10px',
                  color: 'rgb(246, 205, 26)',
                  padding: '5px',
                }}
              />
            </a>
            <a href="">
              <FontAwesomeIcon
                icon={faPinterest}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  width: '15px',
                  height: '15px',
                  fontSize: '10px',
                  color: 'rgb(246, 205, 26)',
                  padding: '5px',
                }}
              />
            </a>
          </div>
        </div>

        <div class="footer-box">
          <h3>Our Service</h3>
          <ul>
            <li>
              <a href="#">Dynamic</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Service</a>
            </li>
          </ul>
        </div>

        <div class="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">What We Do</a>
            </li>
            <li>
              <a href="#">About Company</a>
            </li>
            <li>
              <a href="#">Team Members</a>
            </li>
            <li>
              <a href="#">Watch Video</a>
            </li>
          </ul>
        </div>

        <div class="footer-box">
          <h3>Opening Schedule</h3>
          <ul>
            <li>Sun - Thu: 9.00AM - 8.00PM</li>
            <li>Friday: Closed</li>
            <li>Saturday: 10.00AM - 5.00PM</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 CarWorkshop. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
