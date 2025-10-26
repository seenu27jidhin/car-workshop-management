import './home.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import LogoSlider from '../../components/Logos/logoSlider';
import ProductList from '../../components/ProductList/productList';
import { useState } from 'react';
const Home = () => {
  //const [isOpen, setIsOpen] = useState(true);
  const [toggleStates, setToggleStates] = useState({
    toggle1: true,
    toggle2: false,
    toggle3: false,
    toggle4: false,
    toggle5: false,
  });
  // const toggleClickPopUp = () => {
  //   setIsOpen(!isOpen);
  // };
  const handleToggle = toggleId => {
    setToggleStates(prevStates => ({
      ...prevStates,
      [toggleId]: !prevStates[toggleId],
    }));
  };

  return (
    // <div>

    <section className="tech-section">
      <div className="hero">
        <div className="hero-text">
          <h1>Projects Details</h1>
          <p>Home / Projects Details Page</p>
        </div>
        <div className="hero-image">
          <img src="public/image12.avif" alt="Hero Mechanic" />
        </div>
      </div>

      <div className="tech-right">
        <div className="technology">
          <h2>Advanced Workshop Technology</h2>
          <p>
            Our car service center is equipped with cutting-edge diagnostic
            tools and automated systems to ensure top-tier service. From
            precision alignment to engine tuning, we deliver efficiency and
            excellence.
          </p>
        </div>
        <div className="card-div">
          <div className="tech-card">
            <img src="public/image5.avif" alt="Hero Mechanic" />
            <h3>Easy Bluetooth Soundbar</h3>
            <p>
              Wirelessly stream music and audio from your phone with crisp sound
              quality. Stay connected on the road.
            </p>
          </div>
          <div className="tech-card">
            <img src="public/image4.avif" alt="Hero Mechanic" />
            <h3>Easy Bluetooth Soundbar</h3>
            <p>
              Wirelessly stream music and audio from your phone with crisp sound
              quality. Stay connected on the road.
            </p>
          </div>
          <div className="tech-card">
            <img src="public/image7.avif" alt="Hero Mechanic" />
            <h3>Harman / Cardon Audio</h3>
            <p>
              Immerse yourself in a premium audio experience, designed for
              ultimate driving pleasure and performance.
            </p>
          </div>
        </div>
      </div>
      <div className="container-div">
        <div className="header">
          <span>
            <FontAwesomeIcon icon={faAnglesRight} />
          </span>
          <button className="btn">OUR FAG NOW</button>
        </div>
        <div className="content">
          <h1>Wherever Need Go Repair This Solution Question</h1>
          <div className="service-div">
            <div className="services">
              <div className="service">
                <input
                  type="checkbox"
                  id="toggle1"
                  name="service"
                  checked={toggleStates.toggle1}
                  onChange={() => handleToggle('toggle1')}
                />
                <label for="toggle1" className="toggle-label">
                  Car Service facility erat et odio
                </label>
                {toggleStates.toggle1 && (
                  <div
                    className="toggle-content"
                    // className={`toggle-content ${isOpen ? 'open' : 'closed'}`}
                  >
                    <p>
                      There are many variations of passages of Lorem ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour.
                    </p>
                  </div>
                )}
              </div>
              <div className="service">
                <input
                  type="checkbox"
                  id="toggle2"
                  name="service"
                  checked={toggleStates.toggle2}
                  onChange={() => handleToggle('toggle2')}
                />
                <label for="toggle2" class="toggle-label">
                  Computer Diagnostic Testing
                </label>
                {toggleStates.toggle2 && (
                  <div className="toggle-content">
                    <p>
                      There are many variations of passages of Lorem ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour.
                    </p>
                  </div>
                )}
              </div>
              <div className="service">
                <input
                  type="checkbox"
                  id="toggle3"
                  name="service"
                  checked={toggleStates.toggle3}
                  onChange={() => handleToggle('toggle3')}
                />
                <label for="toggle3" className="toggle-label">
                  Maecenas malesuada
                </label>
                {toggleStates.toggle3 && (
                  <div className="toggle-content">
                    <p>
                      There are many variations of passages of Lorem ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour.
                    </p>
                  </div>
                )}
              </div>
              <div className="service">
                <input
                  type="checkbox"
                  id="toggle4"
                  name="service"
                  checked={toggleStates.toggle4}
                  onChange={() => handleToggle('toggle4')}
                />
                <label for="toggle4" className="toggle-label">
                  Why you join our team
                </label>
                {toggleStates.toggle4 && (
                  <div className="toggle-content">
                    <p>
                      There are many variations of passages of Lorem ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour.
                    </p>
                  </div>
                )}
              </div>
              <div className="service">
                <input
                  type="checkbox"
                  id="toggle5"
                  name="service"
                  checked={toggleStates.toggle5}
                  onChange={() => handleToggle('toggle5')}
                />
                <label for="toggle5" className="toggle-label">
                  Why you join our team
                </label>
                {toggleStates.toggle5 && (
                  <div className="toggle-content">
                    <p>
                      There are many variations of passages of Lorem ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="ourfaq-img-div">
              <img src="public/image11.avif" alt="Hero Mechanic" />
            </div>
          </div>
        </div>
      </div>
      <div className="product-list">
        <ProductList />
      </div>
      <div className="logo-slider">
        <h2>Our Partners</h2>
        <LogoSlider />
      </div>
      <div className="newsletter">
        <div className="subscribe">
          <i className="megaphone-icon"></i>
          <FontAwesomeIcon icon={faBullhorn} />
          <span>Subscribe Newsletter in your to connect services</span>
          <input type="email" placeholder="Your email" />
          <button className="subscribe-btn">SUBSCRIBE</button>
        </div>
      </div>
    </section>
  );
};
export default Home;
