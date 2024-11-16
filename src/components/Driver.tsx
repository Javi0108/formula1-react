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
    <div style={{ height: "100%" }}>
      <Link to={"/"}>
        <button id="backButton">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
      </Link>
      {driver.map((driver) => (
        <div key={driver.position} id="driversContainer">
          <img
            id="driverImg"
            src={`http://localhost:3000/pilots/imgs/${driver.Driver.driverId}.webp`}
            alt={`Imagen de ${driver.Driver.familyName}`}
          />
          <div style={{ width: "50vw", height: "50vh" }}>
            <div id="contentContainer">
              <div id="titleContainer">
                <div id="titles">
                  <div>
                    <h1 id="mainTitle">
                      {driver.Driver.permanentNumber}{" "}
                      <img
                        src={`http://localhost:3000/flags/${driver.Driver.nationality}.svg`}
                        width={50}
                        title={driver.Driver.nationality}
                      />
                    </h1>
                    <h1>
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </h1>
                  </div>
                  <img
                    id="helmetImg"
                    src={`http://localhost:3000/pilots/helmets/${driver.Driver.driverId}.webp`}
                    width={170}
                  />
                </div>
              </div>
              <div id="infoContainer">
                <table id="infoList">
                  <tr>
                    <td id="infoTitle">Team</td>
                    <td id="infoDesc">{driver.Constructors[0].name}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Team nacionality</td>
                    <td id="infoDesc">{driver.Constructors[0].nationality}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Date of birth</td>
                    <td id="infoDesc">{driver.Driver.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Nacionality</td>
                    <td id="infoDesc">{driver.Driver.nationality}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Wins this year</td>
                    <td id="infoDesc">{driver.wins}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Points</td>
                    <td id="infoDesc">{driver.points}</td>
                  </tr>
                  <tr>
                    <td id="infoTitle">Position</td>
                    <td id="infoDesc">{driver.position}º</td>
                  </tr>
                </table>
              </div>
            </div>
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
