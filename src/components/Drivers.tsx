import React, { useEffect, useState } from "react";
import "../style/Drivers.css";
import { Driver } from "../interface/Driver";

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const fetchDrivers = async () => {
    const url = "https://api.openf1.org/v1/drivers?session_key=9158";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
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
  }, []);

  return (
    <div id="container">
      <table id="drivers">
        {drivers.map((driver) => (
          <tr id="driver">
            <td>{driver.driver_number}</td>
            <td>
              <img
                src={driver.headshot_url}
                width={35}
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
