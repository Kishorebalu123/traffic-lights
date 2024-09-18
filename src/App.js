import React from 'react';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import EmergencyButton from './components/EmergencyButton';
import { TrafficProvider } from './context/TrafficLightContext';
import './App.css';

function App() {
  return (
    <TrafficProvider>
      <div className="container">
        <TrafficLight />
        <PedestrianButton />
        <EmergencyButton />
      </div>
    </TrafficProvider>
  );
}

export default App;
