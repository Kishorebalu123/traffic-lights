import React, { useContext } from 'react';
import { TrafficContext } from '../../context/TrafficLightContext';
import './index.css';

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficContext);

  const handlePedestrianRequest = () => {
    if (!state.pedestrianRequested && !state.emergencyOverride) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button className="pedestrian-button" onClick={handlePedestrianRequest}>
      Pedestrian Crossing
    </button>
  );
};

export default PedestrianButton;
