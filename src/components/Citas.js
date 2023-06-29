// src/components/Citas.js

import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Importa el hook useHistory


const Citas = () => {
    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get('/citas'); // reemplaza 'URL_DEL_API' con la URL de tu API
                setCitas(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchCitas();
    }, []);

    const handleEdit = (id) => {
        console.log(`Editando cita con ID ${id}`);
        // Navega a la página de edición de citas con el ID de la cita como parámetro
        navigate(`/editar/${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminando cita con ID ${id}`);
    };

    return (
        <div>
            <h2>Citas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Duración</th>
                        <th>Ubicación</th>
                        <th>Detalles</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => (
                        <tr key={cita.id}>
                            <td>{cita.id}</td>
                            <td>{cita.nombre}</td>
                            <td>{cita.dateTime}</td>
                            <td>{cita.duracion}</td>
                            <td>{cita.ubicacion}</td>
                            <td>{cita.detalles}</td>
                            <td>{cita.estado}</td>
                            <td>
                                <button onClick={() => handleEdit(cita.id)}>Editar</button>
                                <button onClick={() => handleDelete(cita.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Citas;
