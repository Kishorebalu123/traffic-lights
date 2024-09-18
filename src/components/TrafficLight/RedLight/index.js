import React from 'react';
import './index.css';

const RedLight = ({ isOn }) => (
  <div className={`light red ${isOn ? 'on' : ''}`}></div>
);

export default RedLight;
