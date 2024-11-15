import React, { useEffect, useState } from "react";
import { DriverInterface } from "../interface/DriverInterface.tsx";
import { fetchDriver } from "../service/services.tsx";
import { Link, useParams } from "react-router-dom";
import CarViewer from "./CarViewer.tsx";
import "../style/Driver.css";

const Driver: React.FC = () => {
  const { driverId } = useParams<{ driverId: string | undefined }>();
  const [driver, setDriver] = useState<DriverInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (driverId) {
        const fetchedDrivers = await fetchDriver(driverId);
        if (fetchedDrivers) {
          setDriver(fetchedDrivers);
        }
      } else {
        console.error("Driver not found");
      }
    };
    fetchData();
  }, []);

  if(driver.length <= 0) {
    return (
      <div id="driverLoader" style={{ width: "100vw", height: "100vh" }}>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div style={{ height: "100%" }}>
      <Link to={"/"}>
        <button id="backButton">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
      </Link>
      {driver.map((driver) => (
        <div key={driver.position} id="driverContainer">
          <div>
            <div id="titleContainer">
              <img
                src={`http://localhost:3000/pilots/imgs/${driver.Driver.driverId}.webp`}
                alt={`Imagen de ${driver.Driver.familyName}`}
                width={400}
              />
              <div id="titles">
                <div>
                  <h1 className="d-flex flex-row align-items-center gap-3 mt-3">
                    {driver.Driver.permanentNumber}{" "}
                    <img
                      src={`http://localhost:3000/flags/${driver.Driver.nationality}.svg`}
                      width={50}
                    />
                  </h1>
                  <h1>
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </h1>
                </div>
                <img
                  src={`http://localhost:3000/pilots/helmets/${driver.Driver.driverId}.webp`}
                  width={128}
                />
              </div>
            </div>
            <div id="infoContainer">
              <ul id="infoList">
                <li>
                  <span id="infoTitle">Team</span>
                  <span id="infoDesc">{driver.Constructors[0].name}</span>
                </li>
                <li>
                  <span id="infoTitle">Date of birth</span>
                  <span id="infoDesc">{driver.Driver.dateOfBirth}</span>
                </li>
                <li>
                  <span id="infoTitle">Wins</span>
                  <span id="infoDesc">{driver.wins}</span>
                </li>
                <li>
                  <span id="infoTitle">Points</span>
                  <span id="infoDesc">{driver.points}</span>
                </li>
                <li>
                  <span id="infoTitle">Position</span>
                  <span id="infoDesc">{driver.position}º</span>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ width: "50vw", height: "100vh" }}>
            <CarViewer
              modelPath={`http://localhost:3000/3d-Objects/${driver.Constructors[0].constructorId}.glb`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Driver;
