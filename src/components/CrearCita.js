/*
 * MIT License
 *
 * Copyright (c) 2023 Jorge Garcia "George the Penguin"
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
