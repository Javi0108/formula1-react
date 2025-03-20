import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingInterface } from "../interface/MeetingInterface.tsx";
import { fetchMeeting } from "../service/services.tsx";
import Circuit from "./Circuit.tsx";
import RaceResults from "./RaceResults.tsx";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "../style/Meetings.css";

const Meetings: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [globeRadius, setGlobeRadius] = useState();

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

  const handleChange = (
    eventOrCircuit: React.ChangeEvent<HTMLSelectElement> | string
  ) => {
    const selectedCircuitId =
      typeof eventOrCircuit === "string"
        ? eventOrCircuit
        : eventOrCircuit.target.value;

    if (selectedCircuitId === "0") {
      setCircuitId("");
      setCircuitName("");
      setCircuitCountry("");
      setLatitude("");
      setLongitude("");
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
        handleSelectCircuit(
          selectedMeeting.Location.lat,
          selectedMeeting.Location.long
        );
      }
    }
  };

  const gData = meetings.map((meeting) => ({
    lat: meeting.Location.lat,
    lng: meeting.Location.long,
    label: meeting.circuitName,
    circuitId: meeting.circuitId,
    location: meeting.Location.country,
    name: meeting.circuitName,
  }));

  const EARTH_RADIUS_KM = 6371; // km
  const SAT_SIZE = 80; // km

  const satObject = useMemo(() => {
    if (!globeRadius) return undefined;

    const satGeometry = new THREE.OctahedronGeometry(
      SAT_SIZE / EARTH_RADIUS_KM / 2,
      0
    );
    const satMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      transparent: false,
      opacity: 1,
    });
    return new THREE.Mesh(satGeometry, satMaterial);
  }, [globeRadius]);

  if (meetings.length <= 0) {
    return (
      <div id="meetingLoader" style={{ width: "100vw", height: "100vh" }}>
        <span className="loader"></span>
      </div>
    );
  }

  if (meetings.length > 0) {
    return (
      <div id="container">
        <select
          name="meetings"
          id="meetingName"
          onChange={handleChange}
          value={circuit_id}
        >
          <option value="0">
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
        <div id="globe">
          <Globe
            width={window.visualViewport?.width}
            height={window.visualViewport?.height}
            ref={globeEl}
            globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
            onGlobeReady={() =>
              globeEl.current.pointOfView({
                lng: longitude,
                lat: latitude,
                altitude: 2,
              })
            }
            objectsData={gData}
            objectLabel="name"
            objectLat="lat"
            objectLng="lng"
            objectFacesSurfaces={false}
            objectThreeObject={satObject}
            onObjectClick={(obj: any) => { 
              handleChange(obj.circuitId);
            }}
          />
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
          {circuit_id && (
            <RaceResults circuit_id={circuit_id} circuit_name={circuit_name} />
          )}
        </div>
      </div>
    );
  }
};

export default Meetings;
