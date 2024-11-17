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

  if (driver.length <= 0) {
    return (
      <div id="driverLoader" style={{ width: "100vw", height: "100vh" }}>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div style={{ height: "100%" }} id="allDriverContainer">
      <Link to={"/"}>
        <button id="backButton">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
      </Link>
      {driver.map((driver) => (
        <div key={driver.position} id="driversContainer">
          <div
            id="leftContainer"
            style={{
              backgroundImage: `url('http://localhost:3000/pilots/imgs/${driver.Driver.driverId}.webp')`,
            }}
          >
            <div id="titles">
              <div id="titlesContainer">
                <h1 id="mainTitle">
                  {driver.Driver.permanentNumber}{" "}
                  <img
                    src={`http://localhost:3000/flags/${driver.Driver.nationality}.svg`}
                    width={50}
                    title={driver.Driver.nationality}
                  />
                </h1>
                <h1 id="nameTitle">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </h1>
              </div>
              <img
                id="helmetImg"
                src={`http://localhost:3000/pilots/helmets/${driver.Driver.driverId}.webp`}
              />
              <ul id="infoList">
                <li>
                  <span id="infoTitle">
                    Team
                    <p>
                      <img
                        src={`http://localhost:3000/teams/icons/${driver.Constructors[0].constructorId}.webp`}
                        alt={`Escudo de ${driver.Constructors[0].name}`}
                        width={40}
                      />
                    </p>
                  </span>
                </li>
                <li>
                  <span id="infoTitle">
                    Date of birth
                    <p id="infoDesc">{driver.Driver.dateOfBirth}</p>
                  </span>
                </li>
                <li>
                  <span id="infoTitle">
                    Nacionality
                    <p id="infoDesc">{driver.Driver.nationality}</p>
                  </span>
                </li>
                <li>
                  <span id="infoTitle">
                    Wins<p id="infoDesc">{driver.wins}</p>
                  </span>
                </li>
                <li>
                  <span id="infoTitle">
                    Points<p id="infoDesc">{driver.points}</p>
                  </span>
                </li>
                <li>
                  <span id="infoTitle">
                    Position<p id="infoDesc">{driver.position}º</p>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div id="rightContainer">
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
