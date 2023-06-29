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

import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PencilFill } from 'bootstrap-icons/icons/pencil-fill.svg';
import { ReactComponent as XCircleFill } from 'bootstrap-icons/icons/x-circle-fill.svg';
import { ReactComponent as PlusCircleFill } from 'bootstrap-icons/icons/plus-circle-fill.svg';
import ErrorModal from './ErrorModal';


const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [citaToDelete, setCitaToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get('/citas');
                setCitas(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setErrorMessage(error.response?.data?.message || 'Error al obtener las citas');
            }
        };

        fetchCitas();
    }, []);

    const handleEdit = (id) => {
        console.log(`Editando cita con ID ${id}`);
        navigate(`/editar/${id}`);
    };

    const handleDelete = async () => {
        console.log(`Eliminando cita con ID ${citaToDelete}`);
        try {
            await axios.delete(`/citas/${citaToDelete}`);
            setCitas(citas.filter(cita => cita.id !== citaToDelete));
            setCitaToDelete(null);
        } catch (error) {
            console.error("Error deleting cita: ", error);
            setErrorMessage(error.response?.data?.message || 'Error al obtener las citas');
        }
    };

    const openModal = (id) => {
        setCitaToDelete(id);
    };

    const handleCreate = () => {
        navigate('/crear-cita');
    };

    const handleCloseErrorModal = () => {
        setErrorMessage(null);
    };

    return (
        <div className="container">
            <h2>Citas</h2>
            <div className="my-4">
                <button className="btn btn-success" onClick={handleCreate}><PlusCircleFill/>Nueva Cita</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Duración</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Detalles</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => (
                        <tr key={cita.id}>
                            <th scope="row">{cita.id}</th>
                            <td>{cita.nombre}</td>
                            <td>{cita.dateTime}</td>
                            <td>{cita.duracion}</td>
                            <td>{cita.ubicacion}</td>
                            <td>{cita.detalles}</td>
                            <td>{cita.estado}</td>
                            <td>
                                <button type="button" className="btn btn-primary me-2" onClick={() => handleEdit(cita.id)}><PencilFill /></button>
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => openModal(cita.id)}><XCircleFill /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal" tabIndex="-1" id="deleteModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas eliminar esta cita?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorModal errorMessage={errorMessage} onClose={handleCloseErrorModal} />
        </div>
    );
}

export default Citas;
