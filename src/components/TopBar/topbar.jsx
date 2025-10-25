import './topbar.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons/faPhoneVolume';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import { NavLink } from 'react-router-dom';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons/faHandPointer';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { useState } from 'react';
// import { useCart } from '../../Pages/Cart/cart';

const Topbar = ({ items, setItems }) => {
  const [active, setActive] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Example: get user info from localStorage or JWT
    console.log('username');
    const token = localStorage.getItem('token');
    if (token) {
      // If you store user info separately:
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      //console.log(userId);
      if (userName) setUser({ name: userName });
      // Or decode JWT to get user name:
      // const payload = JSON.parse(atob(token.split('.')[1]));
      // setUser({ name: payload.name });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
  };
  return (
    <div className="menubar-container">
      <div className="menubar-top-div">
        <div className="menubar-top-note-div">
          <p>Note: Auto Care Were Excellence!</p>
        </div>
        <div className="login-div">
          <div className="login-text">
            <a href="/cart">
              <FontAwesomeIcon icon={faCartPlus} />
              {items.length > 0 && (
                <span className="cart-count">({items.length}) </span>
              )}
            </a>
            |
            {user ? (
              <span>
                <a href="/profile">Welcome, {user.name} </a>|{' '}
                <a onClick={handleLogout}>Logout</a>
              </span>
            ) : (
              <a href="/login">Login</a>
            )}
            |<a>Help You</a>|
          </div>

          {/* <a>English</a> */}
        </div>
      </div>
      <div className="contact-div">
        <div className="contactno">
          <FontAwesomeIcon
            icon={faPhoneVolume}
            style={{
              backgroundColor: 'black',
              borderRadius: '25px',
              width: '20px',
              height: '20px',
              fontSize: '10px',
              color: '#eff0f0',
              padding: '10px',
            }}
          />
          <div className="call-text">
            <span>
              <b>**9685422522</b>
            </span>
            <p>Requesting a Call</p>
          </div>
        </div>
        <div className="time">
          <FontAwesomeIcon
            icon={faClock}
            style={{
              backgroundColor: 'black',
              borderRadius: '25px',
              width: '20px',
              height: '20px',
              fontSize: '10px',
              color: '#eff0f0',
              padding: '10px',
            }}
          />
          <div className="time-text">
            <span>
              <b>9:00AM - 8:00PM</b>
            </span>
            <p>Saturday - Friday</p>
          </div>
        </div>

        <div className="logo">
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
          <a>logo Image</a>
        </div>

        <div className="e-mail">
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{
              backgroundColor: 'black',
              borderRadius: '25px',
              width: '20px',
              height: '20px',
              fontSize: '10px',
              color: '#eff0f0',
              padding: '10px',
            }}
          />

          <div className="email-text">
            <span>
              <b>E-mail</b>
            </span>
            <p>info@prof.com</p>
          </div>
        </div>
        <div className="location">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{
              backgroundColor: 'black',
              borderRadius: '25px',
              width: '20px',
              height: '20px',
              fontSize: '10px',
              color: '#eff0f0',
              padding: '10px',
            }}
          />
          <div className="location-text">
            <span>
              <b>Location</b>
            </span>
            <p>info@prof.com</p>
          </div>
        </div>
      </div>
      <div className="menubar-list-div">
        <div className="list-menus">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/service"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/contacts"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Contact
          </NavLink>
          <div className="searchbar">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: '#FFD43B' }}
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="list-socialmedia">
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

        <div className="list-appoinment">
          <p>BOOK APPOINTMENT</p>
          <button>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
