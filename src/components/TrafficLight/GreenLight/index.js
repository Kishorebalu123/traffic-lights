import React from 'react';
import './index.css';

const GreenLight = ({ isOn }) => (
  <div className={`light green ${isOn ? 'on' : ''}`}></div>
);

export default GreenLight;
