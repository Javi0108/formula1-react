import React, { useEffect, useState } from "react";
import { DriverInterface } from "../interface/DriverInterface.tsx";

interface DriverProps {
    driver_id: string;
}
  
const Driver: React.FC<DriverProps> = ({ driver_id }) => {
  const [driver, setDriver] = useState<DriverInterface[]>([]);

  const fetchMeeting = async () => {
    const url = `http://api.jolpi.ca/ergast/f1/drivers/${driver_id}`;
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

    return (
      <div id="container" style={{ height: "100%" }}>
       
      </div>
    );
  }

export default Driver;
