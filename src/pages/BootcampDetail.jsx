import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { obtenerBootcampPorId, eliminarBootcamp } from "../services/BootcampApi";
import { useNavigate } from "react-router";
import { AddBootcamp } from "./AddBootcamp.jsx";

function BootcampDetail() {
    const { id } = useParams();
    const [bootcamp, setBootcamp] = useState(null);
    const [editBootcamp, setEditBootcamp] = useState(null);
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de eliminar este bootcamp?")) {
            try {
                await eliminarBootcamp(token, id);
                alert("Bootcamp eliminado con éxito");
                navigate("/dashboard");
            } catch (error) {
                alert("No se pudo eliminar el bootcamp");
            }
        }
    };

    const fetchBootcamp = async () => {
        try {
            const data = await obtenerBootcampPorId(token, id);
            setBootcamp(data);
        } catch (error) {
            console.error("Error cargando bootcamp:", error);
        }
    };

    useEffect(() => {
        fetchBootcamp();
    }, [id]);

    const handleEditBootcamp = () => {
        setEditBootcamp(bootcamp);
    };

    if (!bootcamp) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    //Bootcamps Details
    //Agregando imagen al bootcamp
    const defaultImage = "https://www.muycomputerpro.com/wp-content/uploads/2023/07/bootcamp-formase-desarrollador-programacion-datos.jpeg";

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
                <img
                    src={bootcamp.image || defaultImage}
                    className="card-img-top"
                    alt={bootcamp.name}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                />

                <div className="card-body p-5">
                    {/*Title Bootcamp*/}
                    <h1 className="card-title text-primary fw-bold mb-3 text-center">
                        {bootcamp.name}
                    </h1>

                    {/*Description*/}
                    <p className="card-text fs-5 text-muted text-center">
                        {bootcamp.description}
                    </p>

                    {/*Technologies*/}
                    <h5 className="mt-4 mb-3">Tecnologías incluidas:</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {bootcamp.technologies.map((tech, index) => (
                            <span key={index} className="badge bg-info text-dark px-3 py-2 fs-6">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/*Buttons*/}
                    <div className="mt-5 d-flex justify-content-between">
                        <Link to="/dashboard" className="btn btn-outline-secondary">
                            Volver
                        </Link>
                        <div className="d-flex gap-2">
                            <button
                                onClick={handleEditBootcamp}
                                className="btn btn-warning"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                Editar
                            </button>
                            <button onClick={handleDelete} className="btn btn-danger">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para editar bootcamp */}
            <AddBootcamp
                authToken={token}
                onBootcampCreated={fetchBootcamp}
                editBootcamp={editBootcamp}
                setEditBootcamp={setEditBootcamp}
            />
        </div>
    );
}

export default BootcampDetail;
