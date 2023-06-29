// src/components/CrearCita.js

import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';

const CrearCita = () => {
    const [nombre, setNombre] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [duracion, setDuracion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [detalles, setDetalles] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaCita = {
            nombre,
            dateTime,
            duracion: parseInt(duracion, 10),
            ubicacion,
            detalles
        };

        try {
            await axios.post('/citas', nuevaCita);
            navigate('/');
        } catch (error) {
            console.error("Error creating cita: ", error);
            setErrorMessage(error.response?.data?.message || 'Error al crear la cita');
        }
    };

    const handleCloseErrorModal = () => {
        setErrorMessage(null);
    };

    return (
        <div className="container">
            <h2>Crear Nueva Cita</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateTime" className="form-label">Fecha y Hora</label>
                    <input type="datetime-local" className="form-control" id="dateTime" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="duracion" className="form-label">Duración (en horas)</label>
                    <input type="number" className="form-control" id="duracion" value={duracion} onChange={(e) => setDuracion(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                    <input type="text" className="form-control" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="detalles" className="form-label">Detalles</label>
                    <textarea className="form-control" id="detalles" rows="3" value={detalles} onChange={(e) => setDetalles(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear Cita</button>
            </form>

            <ErrorModal errorMessage={errorMessage} onClose={handleCloseErrorModal} />
        </div>
    );
};

export default CrearCita;
