import React, { useEffect, useState } from "react";
import { DriverInterface } from "../interface/DriverInterface.tsx";
import { fetchDriver } from "../service/services.tsx";
import { useParams } from "react-router-dom";

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

  return (
    <div id="container" style={{ height: "100%" }}>{
      driver.map(driver => (
        <h1>{driver.givenName} {driver.familyName}</h1>
      ))}
    </div>);
};

export default Driver;
