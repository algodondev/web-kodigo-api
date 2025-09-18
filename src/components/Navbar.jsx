import React from 'react';

const Navbar = () => {
    const handleSignout = () => {
        // Eliminar token del localStorage
        localStorage.removeItem("Token");
        // Redirigir al login
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid">
                {/* Logo KODIGO a la izquierda */}
                <a className="navbar-brand fw-bold fs-3" href="/dashboard">
                    KODIGO
                </a>

                {/* Botón de signout a la derecha */}
                <div className="d-flex">
                    <button
                        onClick={handleSignout}
                        className="btn btn-outline-light rounded-pill px-3"
                        type="button">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;