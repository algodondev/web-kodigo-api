import React from "react";
import {user} from "../models/ModelApi.js";
import {registrarUsuario} from "../services/RestServices.js";

export function CreateUser() {

    const usuario = new user();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log("Creando usuario:", usuario);
           // alert("Usuario creado exitosamente");
            const data = await registrarUsuario(usuario);
            console.log("Usuario creado exitosamente:", data);
            alert("Usuario creado exitosamente");
            window.location.href = "/login"; // redirigir al login
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert( error.message || "Error al crear el usuario");
        }

    }


    return (
        <div>
            <h2>Crear Usuario</h2>
            <form>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => (usuario.username = e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => (usuario.password = e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Crear Usuario</button>
            </form>
        </div>
    );      
     

}