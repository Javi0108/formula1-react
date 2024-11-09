import React, { useEffect, useState } from "react";
import { Meeting } from "../interface/Meetings.tsx";
import Circuit from "./Circuit.tsx";
import Drivers from "./Drivers.tsx";
import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const [meetings, setMeeting] = useState<Meeting[]>([]);
  const [circuit_name, setCircuitName] = useState("");
  const [circuit_country, setCircuitCountry] = useState("");
  const [meeting_key, setMeetingKey] = useState(0); // TODO: Arreglar que siempre devuelve 0 al llamar a <Drivers />
  const [session_key, setSessionKey] = useState(0); // TODO: Arreglar que siempre devuelve 0 al llamar a <Drivers />

  const fetchMeeting = async () => {
    const url = "https://api.openf1.org/v1/sessions?session_name=Race&year=2024";
    try {
      const response = await fetch(url, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      console.log("DATA:", data);
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
        console.log("MEETINGS:", meetings);
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
              key={meeting.circuit_key}
              id="meetingContent"
              onLoad={() => {
                setMeetingKey(meeting.meeting_key);
                setSessionKey(meeting.session_key);
              }}
              onClick={() => {
                setCircuitName(meeting.circuit_short_name);
                setCircuitCountry(meeting.country_name);
              }}
            >
              {meeting.circuit_short_name}
            </div>
          ))}
        </div>

        <div id="circuit">
          {
            <Circuit
              circuit_name={circuit_name}
              circuit_country={circuit_country}
            />
          }
        </div>
        <div id="drivers">
          {
            <Drivers meeting_key={meeting_key} session_key={session_key}/>
          }
        </div>
      </div>
    );
  }
};

export default Meetings;
