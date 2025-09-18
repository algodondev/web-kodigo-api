import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {registrarUsuario} from "../services/RestServices.js";

export function CreateUser() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    React.useEffect(() => {
        if (password && confirmPassword) {
            setPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordsMatch(false);
        }
    }, [password, confirmPassword]);

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

    const getInputClassName = (fieldName) => {
        let baseClass = "form-control";
        if (errors[fieldName]) return baseClass + " is-invalid";
        if (fieldName === 'confirmPassword' && confirmPassword && password) {
            return passwordsMatch ? baseClass + " is-valid" : baseClass + " is-invalid";
        }
        if (fieldName === 'password' && password && password.length >= 6) {
            return baseClass + " is-valid";
        }
        return baseClass;
    };

    const isFormValid = password && confirmPassword && passwordsMatch && password.length >= 6;

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 flex-fill" style={{minWidth: '50vw', backgroundColor: '#f8f9fa'}}>
            <div className="w-100" style={{maxWidth: '420px'}}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex align-items-center text-dark fw-semibold" style={{fontSize: '18px'}}>
                        Kodigo Platform
                    </div>
                    <a href="/login" className="text-dark text-decoration-none" style={{fontSize: '14px'}}>Iniciar Sesión</a>
                </div>

                <h1 className="text-dark text-center fw-semibold mb-2" style={{fontSize: '24px'}}>Crear una cuenta</h1>
                <p className="text-center mb-4 text-muted" style={{fontSize: '14px'}}>Ingresa tu información para crear tu cuenta</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className={getInputClassName('username')}
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #dee2e6',
                                borderRadius: '6px',
                                padding: '12px 16px'
                            }}
                            {...register("username", {
                                required: "El usuario es requerido",
                                minLength: { value: 3, message: "El usuario debe tener al menos 3 caracteres" }
                            })}
                        />
                        {errors.username && <div className="text-danger mt-1" style={{fontSize: '12px'}}>{errors.username.message}</div>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className={getInputClassName('password')}
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #dee2e6',
                                borderRadius: '6px',
                                padding: '12px 16px'
                            }}
                            {...register("password", {
                                required: "La contraseña es requerida",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                            })}
                        />
                        {errors.password && <div className="text-danger mt-1" style={{fontSize: '12px'}}>{errors.password.message}</div>}
                        {!errors.password && password && password.length < 6 && (
                            <div className="mt-1 text-muted" style={{fontSize: '12px'}}>La contraseña debe tener al menos 6 caracteres</div>
                        )}
                        {!errors.password && password && password.length >= 6 && (
                            <div className="text-success mt-1" style={{fontSize: '12px'}}>✓ La contraseña cumple los requisitos</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            className={getInputClassName('confirmPassword')}
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid #dee2e6',
                                borderRadius: '6px',
                                padding: '12px 16px'
                            }}
                            {...register("confirmPassword", {
                                required: "Por favor confirma tu contraseña",
                                validate: value => value === password || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.confirmPassword && <div className="text-danger mt-1" style={{fontSize: '12px'}}>{errors.confirmPassword.message}</div>}
                        {!errors.confirmPassword && confirmPassword && password && (
                            passwordsMatch ?
                            <div className="text-success mt-1" style={{fontSize: '12px'}}>✓ Las contraseñas coinciden</div> :
                            <div className="text-danger mt-1" style={{fontSize: '12px'}}>Las contraseñas no coinciden</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`btn w-100 fw-medium mb-4 ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
                        style={{padding: '12px 16px'}}
                        disabled={!isFormValid}
                    >
                        Registrarse
                    </button>
                </form>

            </div>
        </div>
    );
}