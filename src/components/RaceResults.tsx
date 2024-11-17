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

  if (drivers.length <= 0) {
    return (
      <div className="d-flex flex-row align-items-center" style={{ width: "30vw"}}>
        <h4 id="resultTitleContainer" className="fs-6">
          RESULTS
        </h4>
        <div id="resultLoader">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (drivers.length > 0) {
    return (
      <div id="driverContainer">
        <h4 id="resultTitleContainer">
          RESULTS IN 2024
        </h4>
        <div id="drivers">
          {drivers.map((driver) => (
            <div className="col-6">
              <Link
                to={`/driver/${driver.Driver.driverId}`}
                className="card"
              >
                {parseInt(driver.position) === 1 ? (
                  <span id="positionFirst">{driver.position}</span>
                ) : (
                  <span id="positions">
                    {driver.position}
                  </span>
                )}
                <div className="card-body">
                  <img
                    src={`pilots/icons/${driver.Driver.driverId}.png`}
                  />
                  <div className="d-none d-lg-flex flex-column align-items-center justify-content-center">
                    <span className="fs-6">
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </span>
                    <span id="driverPoints">
                      Points: {driver.points} / {driver.status}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default RaceResults;
