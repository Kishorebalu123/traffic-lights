import React from 'react';
import './index.css';

const YellowLight = ({ isOn }) => (
  <div className={`light yellow ${isOn ? 'on' : ''}`}></div>
);

export default YellowLight;
