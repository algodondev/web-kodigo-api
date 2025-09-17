

export const Cards = ({ bootcamps }) => {

    return (
        <div className="row ">
            {bootcamps.length > 0 ? (
                bootcamps.map((bootcamp) => (
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
                                     Tecnologias: {bootcamp.technologies.join("/ ")}
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay bootcamps registrados </p>
            )}
        </div>
    )
}

