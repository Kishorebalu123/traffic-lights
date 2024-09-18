import React, { useContext } from 'react';
import { TrafficContext } from '../../context/TrafficLightContext';
import './index.css';

const EmergencyButton = () => {
  const { state, dispatch } = useContext(TrafficContext);

  const handleEmergency = () => {
    if (!state.emergencyOverride) {
      dispatch({ type: 'EMERGENCY_OVERRIDE' });
    }
  };

  return (
    <button className="emergency-button" onClick={handleEmergency}>
      Emergency Override
    </button>
  );
};

export default EmergencyButton;
