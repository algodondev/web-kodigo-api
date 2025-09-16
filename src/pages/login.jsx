import React from "react";
import { useForm } from "react-hook-form";
import {loginUsuario} from "../services/RestServices.js";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        try {
            const response = await loginUsuario(data);
            console.log("Login exitoso:", response);
            window.location.href = "/dashboard";
        } catch (error) {
            alert("Error en el login: " + error.message);
            console.error("Error en el login:", error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", { required: "El usuario es requerido" })}
                    />
                    {errors.username && <span style={{color: 'red'}}>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", { required: "La contraseña es requerida" })}
                    />
                    {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
