import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLeaf, faStethoscope, faCalendar } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <li><a href="/HomePage"><FontAwesomeIcon icon={faHome} /> Home</a></li>
        <li><a href="/crop-recommendation"><FontAwesomeIcon icon={faLeaf} /> Crop Recommendation</a></li>
        <li><a href="/mawso3a"><FontAwesomeIcon icon={faStethoscope} /> Disease Detection</a></li>
        <li><a href="/disease-recognition"><FontAwesomeIcon icon={faCalendar} /> My Garden Calendar</a></li>
      </ul>
    </div>
  );
};

export default Menu;
