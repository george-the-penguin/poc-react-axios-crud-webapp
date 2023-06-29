import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditarCita = () => {
    const [cita, setCita] = useState({ nombre: '', fecha: '', hora: '' });
    const { id: citaId } = useParams(); // Utiliza el hook useParams
    const navigate = useNavigate(); // Utiliza el hook useNavigate

    useEffect(() => {
        const fetchCita = async () => {
            try {
                const response = await axios.get(`/citas/${citaId}`);
                setCita(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchCita();
    }, [citaId]);

    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/citas/${citaId}`, cita);
            navigate('/'); // Navega de regreso a la página principal
        } catch (error) {
            console.error("Error updating cita: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" name="nombre" value={cita.nombre} onChange={handleChange} />
            </label>
            <label>
                Fecha:
                <input type="date" name="fecha" value={cita.fecha} onChange={handleChange} />
            </label>
            <label>
                Hora:
                <input type="time" name="hora" value={cita.hora} onChange={handleChange} />
            </label>
            <button type="submit">Actualizar Cita</button>
        </form>
    );
};

export default EditarCita;
