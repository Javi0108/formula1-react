import React from 'react';
import './style/App.css'
import Drivers from './components/Drivers.tsx';
import Circuit from './components/Circuit.tsx';

const App: React.FC = () => {
  return (
    <div id='container' style={{ width: '100vw', height: '100vh' }}>
      <Circuit />
      <Drivers />
    </div>
  );
};

export default App;
