import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
    console.log('Enviando petición:', config);
    return config;
}, (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    console.log('Respuesta recibida:', response);
    return response;
}, (error) => {
    console.error('Error en la respuesta:', error);
    return Promise.reject(error);
});

export default api;
