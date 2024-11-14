import React, { useEffect, useRef, useState } from "react";
import { MeetingInterface } from "../interface/MeetingInterface.tsx";
import { fetchMeeting } from "../service/services.tsx";
import Circuit from "./Circuit.tsx";
import RaceResults from "./RaceResults.tsx";
import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const [meetings, setMeeting] = useState<MeetingInterface[]>([]);
  const [circuit_id, setCircuitId] = useState(
    () => localStorage.getItem("circuit_id") || ""
  );
  const [circuit_name, setCircuitName] = useState(
    () => localStorage.getItem("circuit_name") || ""
  );
  const [circuit_country, setCircuitCountry] = useState(
    () => localStorage.getItem("circuit_country") || ""
  );
  const circuitIdRef = useRef(circuit_id);
  const circuitNameRef = useRef(circuit_name);
  const circuitCountryRef = useRef(circuit_country);

  // Hace una llamada a la api siempre que se recarga la pagina
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

  // Guarda en el localStorage las variables
  useEffect(() => {
    localStorage.setItem("circuit_id", circuit_id);
    localStorage.setItem("circuit_name", circuit_name);
    localStorage.setItem("circuit_country", circuit_country);

    circuitIdRef.current = circuit_id;
    circuitNameRef.current = circuit_name;
    circuitCountryRef.current = circuit_country;
  }, [circuit_id, circuit_name, circuit_country]);

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("circuit_id");
      localStorage.removeItem("circuit_name");
      localStorage.removeItem("circuit_country");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
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
          {
            <Circuit
              circuit_id={circuit_id}
              circuit_name={circuit_name}
              circuit_country={circuit_country}
            />
          }
        </div>
        <div id="drivers">
          {circuit_id && (
            <RaceResults circuit_id={circuit_id} circuit_name={circuit_name} />
          )}
        </div>
      </div>
    );
  }
};

export default Meetings;
