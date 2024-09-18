import React, { useContext } from 'react';
import { TrafficContext } from '../../context/TrafficLightContext';
import './index.css';

const TrafficLight = () => {
  const { state } = useContext(TrafficContext);

  return (
    <div className="traffic-light-container">
      <div className="traffic-light">
        <div className={state.currentLight === 'Red' ? 'red' : ''}></div>
        <div className={state.currentLight === 'Yellow' ? 'yellow' : ''}></div>
        <div className={state.currentLight === 'Green' ? 'green' : ''}></div>
      
      </div>
      <div className="timer">{state.timer}s</div>
    </div>
  );
};

export default TrafficLight;
