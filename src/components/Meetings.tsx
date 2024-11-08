import React, { useEffect, useState } from "react";
import { Meeting } from "../interface/Meetings.tsx";
import Circuit from "./Circuit.tsx";
import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const [meetings, setMeeting] = useState<Meeting[]>([]);
  const [circuit_name, setCircuitName] = useState("");

  const fetchMeeting = async () => {
    const url = "https://api.openf1.org/v1/meetings?year=2024";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDrivers = await fetchMeeting();
      if (fetchedDrivers) {
        setMeeting(fetchedDrivers);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="container" style={{ width: "100vw", height: "100vh" }}>
      <div id="meetingName">
        {meetings.map((meeting) => (
          <div
            key={meeting.circuit_key}
            id="meetingContent"
            onClick={() => setCircuitName(meeting.circuit_short_name)}
          >
            {meeting.country_name}
          </div>
        ))}
      </div>

      <div id="circuit">{<Circuit circuit_name={circuit_name} />}</div>
    </div>
  );
};

export default Meetings;
