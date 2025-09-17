

export const Cards = ({ bootcamps }) => {
    //Los Bootcamps desactivados en la API ("active": false) no se mostrarán
    const bootcampsActivos = bootcamps.filter(
        (bootcamp) => bootcamp.active !== false
    );

    return (
        <div className="row ">
            {bootcampsActivos.length > 0 ? (
                bootcampsActivos.map((bootcamp) => (
                    <div key={bootcamp.id} className="mx-5 card col-lg-5 col-md-6 col-sm-12 mb-4 ">
                        <div className="card-header">
                            {bootcamp.name}
                        </div>
                        <div className="card-body">
                            <figure>
                                <blockquote className="blockquote">
                                    <p>{bootcamp.description}</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Tecnologias: {bootcamp.technologies.join("/")}
                                </figcaption>
                            </figure>
                            <a
                                href={`/bootcamp/${bootcamp.id}`} className="btn btn-outline-primary mt-2">
                                Ver Detalle
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay bootcamps registrados </p>
            )}
        </div>
    );
};
