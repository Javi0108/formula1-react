import React, { useEffect, useState } from "react";
import { MeetingInterface } from "../interface/MeetingInterface.tsx";
import Circuit from "./Circuit.tsx";
import RaceResults from "./RaceResults.tsx";
import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const [meetings, setMeeting] = useState<MeetingInterface[]>([]);
  const [circuit_id, setCircuitId] = useState("");
  const [circuit_name, setCircuitName] = useState("");
  const [circuit_country, setCircuitCountry] = useState("");

  const fetchMeeting = async () => {
    const url = "https://api.jolpi.ca/ergast/f1/2024/circuits/";
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      return data["MRData"]["CircuitTable"]["Circuits"];
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMeetings = await fetchMeeting();
      if (fetchedMeetings) {
        setMeeting(fetchedMeetings);
        console.log("MEETINGS: ", meetings);
      }
    };
    fetchData();
  }, []);

  if (meetings.length <= 0) {
    return (
      <div id="meetingLoader" style={{ width: "100vw", height: "100vh" }}>
        <span className="loader"></span>
      </div>
    );
  }

  if (meetings.length > 0) {
    return (
      <div id="container" style={{ height: "100%" }}>
        <div id="meetingName">
          {meetings.map((meeting) => (
            <div
              key={meeting.circuitId}
              id="meetingContent"
              onClick={() => {
                setCircuitId(meeting.circuitId);
                setCircuitName(meeting.circuitName);
                setCircuitCountry(meeting.Location.country);
              }}
            >
              {meeting.circuitName}
            </div>
          ))}
        </div>
        <div id="circuit">
          {circuit_id && (
            <Circuit
              circuit_id={circuit_id}
              circuit_name={circuit_name}
              circuit_country={circuit_country}
            />
          )}
        </div>
        <div id="drivers">
          {circuit_id && <RaceResults circuit_id={circuit_id} circuit_name={circuit_name} />}
        </div>
      </div>
    );
  }
};

export default Meetings;
