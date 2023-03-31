const Event = ({ attributes }) => {
    return (
        <div className="col-12 col-lg-3 my-3">

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{attributes.EventName}</h5>
                    <p>Fecha: {attributes.EventDate}</p>
                    <p>Status: {attributes.EventStatus}</p>
                    <p className="card-text">Hora de Inicio: {attributes.EventStartTime}</p>
                    <p>Hora de termino: {attributes.EventEndTime}</p>
                </div>
            </div>
        </div>
    );
}

export default Event;