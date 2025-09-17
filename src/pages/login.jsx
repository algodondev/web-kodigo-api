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
        <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center p-4 flex-fill" style={{minWidth: '50vw', backgroundColor: '#1a1a1a'}}>
            <div className="w-100" style={{maxWidth: '420px'}}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center text-white fw-semibold" style={{fontSize: '18px'}}>
                        Kodigo Platform
                    </div>
                    <a href="/register" className="text-white text-decoration-none" style={{fontSize: '14px'}}>Registrarse</a>
                </div>

                <h1 className="text-white text-center fw-semibold mb-2" style={{fontSize: '24px'}}>Inicia sesión en tu cuenta</h1>
                <p className="text-center mb-4" style={{color: '#888888', fontSize: '14px'}}>Ingresa tus credenciales para acceder a tu cuenta</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className={`form-control text-white ${errors.username ? 'is-invalid' : ''}`}
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                borderRadius: '6px',
                                padding: '12px 16px',
                                '--bs-form-control-color': '#ffffff'
                            }}
                            {...register("username", { required: "El usuario es requerido" })}
                        />
                        {errors.username && <div className="text-danger mt-1" style={{fontSize: '12px'}}>{errors.username.message}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className={`form-control text-white ${errors.password ? 'is-invalid' : ''}`}
                            style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #3a3a3a',
                                borderRadius: '6px',
                                padding: '12px 16px',
                                '--bs-form-control-color': '#ffffff'
                            }}
                            {...register("password", { required: "La contraseña es requerida" })}
                        />
                        {errors.password && <div className="text-danger mt-1" style={{fontSize: '12px'}}>{errors.password.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-light w-100 fw-medium mb-4" style={{padding: '12px 16px'}}>
                        Iniciar Sesión
                    </button>
                </form>

                
            </div>
        </div>
    );
}

export default Login;
