import { useForm } from "react-hook-form"
import { useState } from "react";
import { crearBootcamp } from "../services/BootcampApi";

export const AddBootcamp = ({ authToken, onBootcampCreated }) => {

    // Si no hay token, no mostrar el formulario
    if (!authToken) {
        return <p>No tienes permiso para agregar un bootcamp.</p>;
    }

    // Configuración de react-hook-form y estados para tecnologías
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [techList, setTechList] = useState([]);
    const [techInput, setTechInput] = useState("");
    const [techError, setTechError] = useState("");

    // Función para agregar y eliminar tecnologías
    const addTechnology = () => {
        if (techInput.trim() !== "") {
            setTechList([...techList, techInput.trim()]);
            setTechInput("");
            setTechError("");
        }
    };

    // Eliminar tecnología por índice
    const removeTechnology = (index) => {
        setTechList(techList.filter((_, i) => i !== index));
    };

    // Función para enviar el bootcamp al backend
    const postBootcamp = async (token, bootcampData) => {
        try {
            const responseApi = await crearBootcamp(token, bootcampData);

            if (onBootcampCreated) {
                onBootcampCreated();
            }
            document.querySelector('#exampleModal .btn-close').click();

        } catch (error) {
            console.error("Error al agregar el bootcamp", error);
            if (error.response?.status === 401) {
                alert("Tu sesión expiró. Por favor, inicia sesión de nuevo.");
                window.location.href = "/login";
            }
        }
    };

    // Función que se ejecuta al enviar el formulario
    const onSubmitFForm = (datos) => {
        if (techList.length === 0) {
            setTechError("Debes agregar al menos una tecnología");
            return;
        }
        const bootcampData = { ...datos, technologies: techList };
        postBootcamp(authToken, bootcampData);
        reset();
        setTechList([]);
        setTechError("");
    };

    return (
        <div>
            <a className="btn btn-primary m-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Bootcamp</a>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar un nuevo Bootcamp</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Formulario para agregar bootcamp */}
                        <form onSubmit={handleSubmit(onSubmitFForm)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="bootcampName" className="form-label">Nombre del Bootcamp</label>
                                    <input type="text" className="form-control" id="bootcampName" required {...register('name', { required: true })} />
                                    {errors.name && <p className="text-danger">El nombre es requerido</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bootcampDescription" className="form-label">Descripción</label>
                                    <textarea className="form-control" id="bootcampDescription" rows="3" required {...register('description', { required: true })}></textarea>
                                    {errors.description && <p className="text-danger">La descripción es requerida</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tecnologías</label>
                                    <div className="d-flex">
                                        <input type="text" className="form-control me-2" value={techInput} onChange={(e) => setTechInput(e.target.value)} />
                                        <button type="button" className="btn btn-success" onClick={addTechnology}>+</button>
                                    </div>
                                    {techError && <p className="text-danger">{techError}</p>}
                                    <ul className="list-group mt-2">
                                        {techList.length === 0 && <li className="list-group-item text-muted">No hay tecnologías añadidas</li>}
                                        {techList.map((tech, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {tech}
                                                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeTechnology(index)}>x</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
