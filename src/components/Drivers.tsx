import React, { useEffect, useState } from "react";
import "../style/Drivers.css";
import { Driver } from "../interface/Driver";

interface DriverProps {
  meeting_key: number;
  session_key: number;
}

const Drivers: React.FC<DriverProps> = ({ meeting_key, session_key }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  console.log("PROPS:", meeting_key, session_key);

  const fetchDrivers = async () => {
    const url = `https://api.openf1.org/v1/drivers?session_key=${session_key}&meeting_key=${meeting_key}`;
    try {
      const response = await fetch(url);
      console.log("RESPONSE:", response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDrivers = await fetchDrivers();
      console.log(fetchedDrivers);
      if (fetchedDrivers) {
        setDrivers(fetchedDrivers);
      }
    };
    fetchData();
  }, [meeting_key, session_key]);

  console.log("DRIVERS:", drivers);

  return (
    <div id="driverContainer">
      <table id="drivers">
        {drivers.map((driver, index) => (
          <tr key={driver.driver_number} id="driver">
            <td>{driver.driver_number}</td>
            <td>
              <img
                src={driver.headshot_url}
                width={40}
              />
            </td>
            <td>{driver.full_name}</td>
            <td>
              <img
                src={`flags/${driver.country_code}.svg`}
                width="40"
                title={driver.country_code}
                alt={`Bandera de ${driver.country_code}`}
              />
            </td>
            <td>{driver.team_name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Drivers;
