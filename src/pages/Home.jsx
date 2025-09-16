import { Cards } from "./Cards"
import { useEffect, useState } from "react";
import { obtenerBootcamps } from "../services/BootcampApi.js";



export const Home = () => {

  const token = localStorage.getItem("Token");
  if (token === null) {
    return <div className="container mt-5">
      <h1 className="text-center">Bienvenido a la plataforma de Bootcamps</h1>
      <p className="text-center">Por favor, inicie sesión para ver los bootcamps disponibles.</p>
      <a href="/login" className="btn btn-primary">Iniciar sesión</a>
    </div>
  }

  const [bootcampsArray, setBootcamps] = useState([]);

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        const responseApi = await obtenerBootcamps(token);
        setBootcamps(responseApi);
      } catch (error) {
        console.error("Error al traer bootcamps:", error);
      }
    };

    fetchBootcamps();
  }, []);
  return (
    <div className="container mt-5">
      <Cards bootcamps={bootcampsArray} />
    </div>
  )
}

