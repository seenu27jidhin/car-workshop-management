import './about.css';
const features = [
  {
    number: '01',
    title: 'Pricing',
    desc: 'We promise that you will be completely satisfied with our work.',
  },
  {
    number: '02',
    title: 'Customers',
    desc: 'Focusing on our customers’ needs and building long-term relationships through total customer satisfaction.',
  },
  {
    number: '03',
    title: 'Employees',
    desc: 'Providing continued training, motivation and sound, dynamic management practices.',
  },
  {
    number: '04',
    title: 'Performance',
    desc: 'Providing quality auto repairs, efficient and effective diagnoses of problems, on-time service and maintenance.',
  },
  {
    number: '05',
    title: 'Excellence',
    desc: 'Exceptional customer satisfaction through superior service and professional standards.',
  },
  {
    number: '06',
    title: 'Integrity',
    desc: 'Communicating openly and honestly at all times, and full delivery on all commitments.',
  },
  {
    number: '07',
    title: 'Quality',
    desc: 'We’re committed to providing a comfortable and confident experience to both new and returning customers.',
  },
  {
    number: '08',
    title: 'Community',
    desc: 'Supporting our local community and building trust with every interaction.',
  },
];

const About = () => {
  return (
    <div className="aboutus-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">Home / About Us</div>

      {/* Main Section */}
      <div className="main-section">
        <div className="section-header">
          <div className="section-label">WHAT MAKES US DIFFERENT</div>
          <h1>Our commitment to an excellent car service experience</h1>
          <p className="section-desc">
            Donec finibus, urna bibendum ultricies laoreet, augue eros luctus
            sapien, in hac habitasse platea dictumst. Sed ornare venenatis
            tellus, non lobortis diam volutpat sit amet. Sed tellus augue,
            blandit eu rutrum in, porttitor et metus. Mauris ac hendrerit metus.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature" key={i}>
              <div className="feature-number">{f.number}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div>
          <div className="cta-label">JOIN OUR COMMUNITY</div>
          <div className="cta-title">
            Join 100K<sup>+</sup> customer trusting us
          </div>
          <button className="cta-btn">GET STARTED</button>
        </div>
        <img src="public/image15.avif" alt="Mechanics" className="cta-img" />
      </div>
    </div>
  );
};
export default About;
