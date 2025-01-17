import React, { useState } from 'react';
import '../styles/HomePage.css';
import logo from '../icon3.png';

import cropRecommendationImage from '../images/Agri-Education-800x800-1-1.webp'
import chatBotImage from '../images/close-up-man-using-tablet-field.jpg';
import diseaseDetectionImage from '../images/Plant-disease-classifier-with-ai-blog-banner.jpg';

const services = [
  { id: 1, title: "Crop Recommendation", image: cropRecommendationImage, link: "crop_recommendation" },
  { id: 2, title: "My Garden Calendar", image: chatBotImage, link: "/calendar" },
  { id: 3, title: "Disease Detection", image: diseaseDetectionImage, link: "/disease" }
];

const HomePage = () => {
  const [showServices, setShowServices] = useState(false);

  const scrollToServices = () => {
    setShowServices(true);
    setTimeout(() => {
      const servicesSection = document.getElementById('sercont');
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    },); 
  };
  

  return (
    <div className="App" style={{ backgroundImage: `url(${'pexels-rebaz-geo-7626143.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Green Growth</h1>
      </header>
      <div className="opstmn">
        <p>Boost Your Harvest!</p>
      </div>
      <div className="introcontainer">
        <p>Use Green Growth's recommendation system and disease detection tool
           to maximize your yield and keep crops healthy.</p>
        <button onClick={scrollToServices} className="scroll-button">Get Started</button>
      </div>
      <div id="services" className={`services ${showServices ? 'show' : ''}`}>
        <h2>Our Services</h2>
        <div className="service-cards-container"id='sercont'>
          {services.map((service) => (
            <a key={service.id} href={service.link} className="service-card">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-title">{service.title}</div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;



