import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/RaceResult.css";
import { RaceResultInterface } from "../interface/RaceResultInterface";
import { fetchResults } from "../service/services.tsx";

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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDrivers = await fetchResults(circuit_id);
      if (fetchedDrivers) {
        setDrivers(fetchedDrivers);
      }
    };
    fetchData();
  }, [circuit_id]);

  console.log("DRIVERS:", drivers);

  return (
    <div id="driversContainer">
      <h4 id="sectionTitle">Results in {circuit_name}</h4>
      <div id="drivers">
        {drivers.map((driver) => (
          <div className="col-6">
            <Link
              to={`/driver/${driver.Driver.driverId}`}
              className="card d-flex flex-row align-items-center ps-5"
            >
              {parseInt(driver.position) === 1 ? (
                <span id="position">{driver.position}</span>
              ) : (
                <span style={{ fontWeight: "bolder", fontSize: "larger" }}>
                  {driver.position}
                </span>
              )}
              <div className="card-body d-flex flex-row align-items-center gap-3">
                <img
                  src={`pilots/icons/${driver.Driver.driverId}.png`}
                  width={40}
                />
                <div className="d-flex flex-column align-items-center">
                  <span className="fs-6">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </span>
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
