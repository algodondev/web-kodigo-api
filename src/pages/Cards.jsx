

export const Cards = ({ bootcamps }) => {
    //Los Bootcamps desactivados en la API ("active": false) no se mostrarán
    const bootcampsActivos = bootcamps.filter(
        (bootcamp) => bootcamp.active !== false
    );

    return (
        <div className="row g-4 justify-content-center">
            {bootcampsActivos.length > 0 ? (
                bootcampsActivos.map((bootcamp) => (
                    <div key={bootcamp.id} className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
                        <div className="card h-100 shadow-sm border-0 rounded-3 hover-card">
                            <div className="card-header bg-primary text-white text-center py-3">
                                <h5 className="card-title mb-0 fw-bold">{bootcamp.name}</h5>
                            </div>
                            <div className="card-body d-flex flex-column p-4">
                                <p className="card-text text-muted mb-4 flex-grow-1">
                                    {bootcamp.description}
                                </p>

                                <div className="mb-4">
                                    <h6 className="text-primary fw-semibold mb-2">Tecnologías:</h6>
                                    <div className="d-flex flex-wrap gap-1">
                                        {bootcamp.technologies.map((tech, index) => (
                                            <span key={index} className="badge bg-light text-primary border border-primary px-2 py-1">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <a
                                        href={`/bootcamp/${bootcamp.id}`}
                                        className="btn btn-primary w-100 rounded-pill">
                                        Ver Detalle
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-12 text-center">
                    <div className="alert alert-info border-0 rounded-3 py-4">
                        <h5 className="text-muted mb-0">No hay bootcamps registrados</h5>
                        <p className="text-muted mb-0">¡Sé el primero en agregar un bootcamp!</p>
                    </div>
                </div>
            )}
        </div>
    );
};
