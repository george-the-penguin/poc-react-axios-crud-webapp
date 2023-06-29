import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PencilFill } from 'bootstrap-icons/icons/pencil-fill.svg';
import { ReactComponent as XCircleFill } from 'bootstrap-icons/icons/x-circle-fill.svg';


const Citas = () => {
    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get('/citas');
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
                                <button type="button" className="btn btn-primary me-2" onClick={() => handleEdit(cita.id)}><PencilFill/></button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(cita.id)}><XCircleFill/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Citas;
