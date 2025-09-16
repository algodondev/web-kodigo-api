import React from "react";
import { useForm } from "react-hook-form";
import {registrarUsuario} from "../services/RestServices.js";

export function CreateUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        try {
            console.log("Creando usuario:", data);
            const response = await registrarUsuario(data);
            console.log("Usuario creado exitosamente:", response);
            alert("Usuario creado exitosamente");
            window.location.href = "/login";
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert(error.message || "Error al crear el usuario");
        }
    }

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "El usuario es requerido",
                            minLength: { value: 3, message: "El usuario debe tener al menos 3 caracteres" }
                        })}
                    />
                    {errors.username && <span style={{color: 'red'}}>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                        })}
                    />
                    {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}