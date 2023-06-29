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

import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorModal from './ErrorModal';

const EditarCita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [cita, setCita] = useState({
        id: "",
        nombre: "",
        dateTime: "",
        duracion: "",
        ubicacion: "",
        detalles: ""
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
        try {
            await axios.put(`/citas`, cita);
            navigate('/');
        }catch (error) {
            console.error("Error updating cita: ", error);
            setErrorMessage(error.response?.data?.message || 'Error al actualizar la cita');
        }
    };

    const handleCloseErrorModal = () => {
        setErrorMessage(null);
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

            <ErrorModal errorMessage={errorMessage} onClose={handleCloseErrorModal} />
        </div>
    );
};

export default EditarCita;
