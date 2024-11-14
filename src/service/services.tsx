export const fetchMeeting = async () => {
  const url = "/api/ergast/f1/2024/circuits/"; // TODO: Arreglar Proxy Server y la URL
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    const data = await response.json();
    return data["MRData"]["CircuitTable"]["Circuits"];
  } catch (error) {
    console.error("Hubo un problema con la petición:", error);
  }
};

export const fetchResults = async (circuitId) => {
  const url = `/api/ergast/f1/2024/circuits/${circuitId}/results/`; // TODO: Arreglar Proxy Server y la URL
  try {
    const response = await fetch(url);

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

export const fetchDriver = async (driverId) => {
    const url = `/api/ergast/f1/drivers/${driverId}`; // TODO: Arreglar Proxy Server y la URL
  
    try {
      const response = await fetch(url);
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data["MRData"]["DriverTable"]["Drivers"];
      } else {
        console.error("Received non-JSON response");
        const text = await response.text(); // Optional: log the HTML response
        throw new Error(`Unexpected response format: ${text}`);
      }
    } catch (error) {
      console.error("Hubo un problema con la petición:", error);
    }
  };
  
