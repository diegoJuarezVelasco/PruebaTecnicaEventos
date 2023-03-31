import { useState } from "react";
import Event from "./Event";
import XMLParser from 'react-xml-parser';
import axios from "axios";
const Form = () => {

    const [formInfo, setFormInfo] = useState({
        fecha: "",
        dias: ""
    });
    const [events, setEvents] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const { fecha, dias } = formInfo;

    const fetchEventos = async () => {
        try {
            const response = await axios.request({
                method: "POST",
                url: "http://3.140.212.226:5006/getAndazEvt",
                data: formInfo,
            })
            let ParsedXMLToJSON = new XMLParser().parseFromString(response.data);
            if(ParsedXMLToJSON.children[3].children.length > 0 ) {
                setEvents(ParsedXMLToJSON.children[3].children);
                setMensaje(false);
                setMostrarMensaje(false)
            } else {
                setEvents([]);
                setMensaje('No hay eventos en la fecha ingresada');
                setMostrarMensaje(true);
            }

        }
        catch (error) {
            console.log(error);
        }

    }
    const handleOnSubmit = e => {
        e.preventDefault();
        fetchEventos();
    }
    const handleChange = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="container">
            <div className="py-4 d-flex justify-content-center">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">Fecha</label>
                        <input type="text" name="fecha" id="fecha" onChange={handleChange} value={fecha}  className="form-control"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fecha" className="form-label">Dias</label>
                        <input type="text" name="dias" id="dias" onChange={handleChange} value={dias} className="form-control"/>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <button type= "submit" className="btn btn-primary">Consultar Eventos</button>
                    </div>
                </form>
            </div>
            <div className="d-flex justify-content-center">
                {mostrarMensaje ? <p className="alert alert-danger">{mensaje}</p> : null}
            </div>
            <div className="py-4 row">

            {events.length > 0 ? (events.map((event, index) => {
                
                return <Event key={index} attributes={event.attributes} />
                
                
            })) : null
            
            }
            </div>

        </div>


    );
}

export default Form;