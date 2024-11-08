import React from "react";
import Meetings from "./components/Meetings.tsx";
import "./style/App.css";

const App: React.FC = () => {
  return (
    <div id="container" style={{ width: "100%", height: "100%" }}>
      <Meetings />
    </div>
  );
};

export default App;
