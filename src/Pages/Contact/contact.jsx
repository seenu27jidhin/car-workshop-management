import './contact.css';
const Contact = () => (
  <div className="contact-container">
    <section className="contact-hero">
      <h1>CONTACT US</h1>
      <p>Start the conversation to establish good relationship and business.</p>
    </section>

    <section className="contact-main">
      <div className="contact-info">
        <h2>Get in touch</h2>
        <p>Feel free to reach out to us for any queries or support.</p>
        <div className="info-block">
          <div className="info-icon">📍</div>
          <div>
            <b>OUR OFFICE</b>
            <br />
            Jln Cempaka wangi No 22
            <br />
            Jakarta - Indonesia
          </div>
        </div>
        <div className="info-block">
          <div className="info-icon">📞</div>
          <div>
            <b>CALL US</b>
            <br />
            (+6221) 2002 2012
            <br />
            (+6221) 2002 2013
          </div>
        </div>
        <div className="info-block">
          <div className="info-icon">✉️</div>
          <div>
            <b>EMAIL US</b>
            <br />
            support@yourdomain.tld
            <br />
            hello@yourdomain.tld
          </div>
        </div>
        <div className="social-media">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h2>Send us a message</h2>
        <p>
          Cras id potenti mollis gravida ultricies vehicula eros phasellus netus
          primis libero metus consectetur maecenas.
        </p>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="Company" />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Phone" />
            <input type="email" placeholder="Email" required />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message" rows={4}></textarea>
          <button type="submit" className="send-btn">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>

    <section className="contact-map">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.96423223213!2d-0.134649!3d51.507350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3333333333%3A0x1234567890abcdef!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  </div>
);
export default Contact;
