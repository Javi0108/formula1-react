import React, { useEffect, useState } from "react";
import { DriverInterface } from "../interface/DriverInterface.tsx";
import { useParams } from "react-router-dom";

const Driver: React.FC = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const [driver, setDriver] = useState<DriverInterface[]>([]);

  const fetchMeeting = async () => {
    const url = `http://api.jolpi.ca/ergast/f1/drivers/${driverId}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      return data["MRData"]["DriverTable"]["Drivers"];
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDrivers = await fetchMeeting();
      if (fetchedDrivers) {
        setDriver(fetchedDrivers);
        console.log("DRIVERS: ", driver);
      }
    };
    fetchData();
  }, []);

  return <div id="container" style={{ height: "100%" }}>{driverId}</div>;
};

export default Driver;
