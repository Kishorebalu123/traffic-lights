import React, { createContext, useReducer, useEffect } from 'react';

export const TrafficContext = createContext();

const initialState = {
  currentLight: 'Green', // Initial light
  pedestrianRequested: false,
  emergencyOverride: false,
  timer: 10, // Initial timer for Green light
};

const trafficReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      if (state.emergencyOverride || state.pedestrianRequested) {
        // If emergency or pedestrian is active, ignore normal light sequence
        return state;
      }

      if (state.currentLight === 'Green') {
        return { ...state, currentLight: 'Yellow', timer: 3 };
      } else if (state.currentLight === 'Yellow') {
        return { ...state, currentLight: 'Red', timer: 7 };
      } else {
        return { ...state, currentLight: 'Green', timer: 10 };
      }

    case 'REQUEST_CROSSING':
      if (state.currentLight === 'Red' || state.pedestrianRequested || state.emergencyOverride) {
        // Prevent multiple requests or triggering during emergency
        return state;
      }
      return { ...state, pedestrianRequested: true };

    case 'START_CROSSING':
      // Switch to Red light for pedestrian crossing
      return { ...state, currentLight: 'Red', timer: 5, pedestrianRequested: false };

    case 'EMERGENCY_OVERRIDE':
      return {
        ...state,
        currentLight: 'Green', // Emergency vehicles can pass with Green light
        emergencyOverride: true,
        timer: 10, // Reset timer for emergency override
      };

    case 'RESET_EMERGENCY':
      return { ...state, emergencyOverride: false };

    case 'TICK':
      return { ...state, timer: state.timer - 1 };

    case 'RESET_TIMER':
      return { ...state, timer: action.payload };

    default:
      return state;
  }
};

export const TrafficProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficReducer, initialState);

  const getNextLight = () => {
    dispatch({ type: 'CHANGE_LIGHT' });
  };

  // Main timer logic using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });

      if (state.timer <= 1) {
        if (state.emergencyOverride) {
          // Reset emergency override when timer ends
          dispatch({ type: 'RESET_EMERGENCY' });
          getNextLight(); // Resume normal sequence
        } else if (state.pedestrianRequested && state.currentLight !== 'Red') {
          // Switch to Red for pedestrian crossing when requested
          dispatch({ type: 'START_CROSSING' });
        } else if (state.pedestrianRequested && state.currentLight === 'Red') {
          // Once pedestrian time is up, go back to Green
          getNextLight();
        } else {
          // Normal traffic light cycle
          getNextLight();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timer, state.emergencyOverride, state.pedestrianRequested]);

  return (
    <TrafficContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficContext.Provider>
  );
};
