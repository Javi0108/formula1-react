import React, { useEffect, useRef, useState } from "react";
import { MeetingInterface } from "../interface/MeetingInterface.tsx";
import { fetchMeeting } from "../service/services.tsx";
import Circuit from "./Circuit.tsx";
import RaceResults from "./RaceResults.tsx";
import Globe from "react-globe.gl";

import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const globeEl = useRef<any>(null);

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
  const [latitude, setLatitude] = useState(
    () => localStorage.getItem("latitude") || "0"
  );
  const [longitude, setLongitude] = useState(
    () => localStorage.getItem("longitude") || "0"
  );
  const [labelSize, setLabelSize] = useState(
    () => localStorage.getItem("labelSize") || "15px"
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
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    localStorage.setItem("labelSize", labelSize);

    circuitIdRef.current = circuit_id;
    circuitNameRef.current = circuit_name;
    circuitCountryRef.current = circuit_country;
  }, [circuit_id, circuit_name, circuit_country]);

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("circuit_id");
      localStorage.removeItem("circuit_name");
      localStorage.removeItem("circuit_country");
      localStorage.removeItem("latitude");
      localStorage.removeItem("longitude");
      localStorage.removeItem("labelSize");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleSelectCircuit = (latitude, longitude) => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lng: longitude, lat: latitude }, 1000);
    }
  };

  const handleChange = (eventOrCircuit: React.ChangeEvent<HTMLSelectElement> | string) => {
    const selectedCircuitId = typeof eventOrCircuit === "string" ? eventOrCircuit : eventOrCircuit.target.value;

    if (selectedCircuitId === "0") {
      setCircuitId("");
      setCircuitName("");
      setCircuitCountry("");
      setLatitude("");
      setLongitude("");
      setLabelSize("15px");
    } else {
      const selectedMeeting = meetings.find(
        (meeting) => meeting.circuitId === selectedCircuitId
      );
      if (selectedMeeting) {
        setCircuitId(selectedMeeting.circuitId);
        setCircuitName(selectedMeeting.circuitName);
        setCircuitCountry(selectedMeeting.Location.country);
        setLatitude(selectedMeeting.Location.lat);
        setLongitude(selectedMeeting.Location.long);
        setLabelSize("20px");
        handleSelectCircuit(
          selectedMeeting.Location.lat,
          selectedMeeting.Location.long
        );
      }
    }
  };

  if (meetings.length <= 0) {
    return (
      <div id="meetingLoader" style={{ width: "100vw", height: "100vh" }}>
        <span className="loader"></span>
      </div>
    );
  }

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  const gData = meetings.map((meeting) => ({
    lat: meeting.Location.lat,
    lng: meeting.Location.long,
    label: meeting.circuitName,
    circuitId: meeting.circuitId,
    location: meeting.Location.country,
    circuitName: meeting.circuitName,
  }));


  if (meetings.length > 0) {
    return (
      <div id="container">
        <select
          name="meetings"
          id="meetingName"
          onChange={handleChange}
          value={circuit_id}
        >
          <option value="0" selected>
            Select a circuit
          </option>
          {meetings.map((meeting) => (
            <option
              value={meeting.circuitId}
              key={meeting.circuitId}
              id="meetingContent"
            >
              {meeting.circuitName} - {meeting.Location.country}
            </option>
          ))}
        </select>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          onGlobeReady={() =>
            globeEl.current.pointOfView({ lng: longitude, lat: latitude, altitude: 1.5 })
          }
          htmlElementsData={gData}
          backgroundColor="#082032"
          htmlElement={(d) => {
            const el = document.createElement("div");
            el.id = "htmlMarker";
            el.innerHTML = markerSvg;
            el.style.color = "#2ee7d6";
            el.style.width = "15px";
            el.style.transition = "width 200ms";
            el.title = d.circuitName;

            el.style.pointerEvents = "auto";
            el.style.cursor = "pointer";

            el.onclick = () =>{
              el.style.color = "#ff4c29";
              el.style.width = "30px";
              handleChange(d.circuitId); 
              
            }

            el.addEventListener("mouseover", () => {
              el.style.color = "#ff4c29";
              el.style.width = "30px";
            });

            el.addEventListener("mouseout", () => {
              el.style.color = "#2ee7d6";
              el.style.width = "15px";
            });

            return el;
          }}
          htmlTransitionDuration={1000}
        />
        <div id="circuit">
            { circuit_id &&
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
        {/* <div id="meetingContainer">
          <select
            name="meetings"
            id="meetingName"
            onChange={handleChange}
            value={circuit_id}
          >
            <option value="0" selected>
              Select a circuit
            </option>
            {meetings.map((meeting) => (
              <option
                value={meeting.circuitId}
                key={meeting.circuitId}
                id="meetingContent"
              >
                {meeting.circuitName} - {meeting.Location.country}
              </option>
            ))}
          </select>
          <div id="circuit">
            {
              <Circuit
                circuit_id={circuit_id}
                circuit_name={circuit_name}
                circuit_country={circuit_country}
              />
            }
          </div>
        </div>
        <div id="drivers">
          {circuit_id && (
            <RaceResults circuit_id={circuit_id} circuit_name={circuit_name} />
          )}
        </div> */}
      </div>
    );
  }
};

export default Meetings;
