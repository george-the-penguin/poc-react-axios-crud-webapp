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

import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'
});

console.log("X:", process.env.REACT_APP_API_BASE_URL)
console.log("API URL:", api.defaults.baseURL);

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
