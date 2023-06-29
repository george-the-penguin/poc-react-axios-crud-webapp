import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cita, setCita] = useState({
        id: "",
        nombre: "",
        dateTime: "",
        duracion: "",
        ubicacion: "",
        detalles: "",
        estado: ""
    });

    useEffect(() => {
        const fetchCita = async () => {
            const response = await axios.get(`/citas/${id}`);
            setCita(response.data);
        };

        fetchCita();
    }, [id]);

    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/citas`, cita);
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Editar Cita</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={cita.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateTime" className="form-label">Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="dateTime"
                        name="dateTime"
                        value={cita.dateTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duracion" className="form-label">Duración (Horas)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="duracion"
                        name="duracion"
                        value={cita.duracion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ubicacion"
                        name="ubicacion"
                        value={cita.ubicacion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="detalles" className="form-label">Detalles</label>
                    <input
                        type="text"
                        className="form-control"
                        id="detalles"
                        name="detalles"
                        value={cita.detalles}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarCita;
