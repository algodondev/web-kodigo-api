import { Cards } from "./Cards"
import { useEffect, useState } from "react";
import { obtenerBootcamps } from "../services/BootcampApi.js";
import { AddBootcamp } from "./AddBootcamp.jsx";


export const Home = () => {
  // Estado para almacenar los bootcamps
  const [bootcampsArray, setBootcamps] = useState([]);

  // Obtener token del localStorage
  const token = localStorage.getItem("Token");

  // Función para obtener los bootcamps desde el backend
  const fetchBootcamps = async () => {
    try {
      const responseApi = await obtenerBootcamps(token);
      setBootcamps(responseApi);
    } catch (error) {
      console.error("Error al traer bootcamps:", error);
      if (error.response?.status === 401) {
        alert("Tu sesión expiró. Por favor, inicia sesión de nuevo.");
        window.location.href = "/login";
      }
    }
  };

  // useEffect para cargar los bootcamps al montar el componente y cada 5 segundos
  useEffect(() => {
    fetchBootcamps();
    const interval = setInterval(fetchBootcamps, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">Bootcamps Disponibles</h1>
          <p className="lead text-muted">Descubre nuestros programas de formación intensiva</p>
          <AddBootcamp
            authToken={token}
            onBootcampCreated={fetchBootcamps}
          />
        </div>
        <Cards
          bootcamps={bootcampsArray}
        />
      </div>
    </div>
  )
}

