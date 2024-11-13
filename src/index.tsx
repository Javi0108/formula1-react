import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Meetings from './components/Meetings.tsx';
import Driver from './components/Driver.tsx';
import reportWebVitals from './reportWebVitals.ts';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* <Meetings /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Meetings/>}/>
          <Route path='driver/:driverId' element={<Driver />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
