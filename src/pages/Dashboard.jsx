import React, { use } from "react";
import { useEffect, useState } from "react";

function Dashboard() {
    const [token, setToken] = useState("");
    const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar sesión
        alert("Sesión cerrada");
        // eliminar token almacenado en localStorage
        localStorage.removeItem("Token");
        window.location.href = "/login"; // redirigir al login
    };

    //se ejecuta al cargar la pagina solo una vez al inicio
    useEffect(() => {
        const storedToken = localStorage.getItem("Token");
        if (storedToken) {
            setToken(storedToken);
        }else{
            window.location.href = "/login"; // redirigir al login
        }
    }, []);

 

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al panel de control.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;