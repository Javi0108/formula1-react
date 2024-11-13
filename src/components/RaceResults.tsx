import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/RaceResult.css";
import { RaceResultInterface } from "../interface/RaceResultInterface";

interface RaceResultsProps {
  circuit_id: string;
  circuit_name: string;
}

const RaceResults: React.FC<RaceResultsProps> = ({
  circuit_id,
  circuit_name,
}) => {
  const [drivers, setDrivers] = useState<RaceResultInterface[]>([]);
  console.log("PROPS:", circuit_id);

  const fetchDrivers = async () => {
    const url = `https://api.jolpi.ca/ergast/f1/2024/circuits/${circuit_id}/results/`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      console.log(response);
      const data = await response.json();
      console.log("DATA: ", data["MRData"]["RaceTable"]["Races"][0]["Results"]);

      return data["MRData"]["RaceTable"]["Races"][0]["Results"];
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDrivers = await fetchDrivers();
      if (fetchedDrivers) {
        setDrivers(fetchedDrivers);
      }
    };
    fetchData();
  }, [circuit_id]);

  console.log("DRIVERS:", drivers);

  return (
    <div id="driverContainer">
      <h3 id="sectionTitle">Results in {circuit_name}</h3>
      <div id="drivers">
        {drivers.map((driver) => (
          <div className="col-6">
            <Link
              to={`driver/${driver.Driver.driverId}`}
              className="card d-flex flex-row align-items-center ps-5"
            >
              {parseInt(driver.position) === 1 ? (
                <span id="position">{driver.position}</span>
              ) : (
                <span style={{ fontWeight: "bolder", fontSize: "larger" }}>
                  {driver.position}
                </span>
              )}
              <div className="card-body d-flex flex-row align-items-center gap-2">
                <img
                  src={`pilots/${driver.Driver.driverId}.png`}
                  alt={`Imagen de ${driver.Driver.familyName}`}
                />
                <div className="d-flex flex-column align-items-center">
                  <h5 className="card-title ">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </h5>
                  <p className="card-text">{driver.Constructor.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* <div key={driver.position} id="driver">
            <span >
              
            </span>
            <span>{driver.Driver.permanentNumber}</span>
            <span>
              <img src={`pilots/${driver.Driver.driverId}.png`} width={40} />
            </span>
            <span>
              {driver.Driver.givenName} {driver.Driver.familyName}
            </span>
            <span>
              {/* <img
                src={`flags/${driver.country_code}.svg`}
                width="40"
                title={driver.country_code}
                alt={`Bandera de ${driver.country_code}`}
              />
            </span>
            <span>{driver.Constructor.name}</span>
          </div> 
        ))} */}
      </div>
    </div>
  );
};

export default RaceResults;
