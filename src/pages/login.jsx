import React from "react";
import {loginUsuario} from "../services/RestServices.js";
import {user} from "../models/ModelApi.js";

function Login() {

    const object = new user();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = await loginUsuario(object);
            console.log("Login exitoso:", data);
            //para que se redireccione a otra pagina
            window.location.href = "/dashboard"; 
        } catch (error) {
            alert("Error en el login: " + error.message);
            console.error("Error en el login:", error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => (object.username = e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => (object.password = e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
