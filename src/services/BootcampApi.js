
import axios from 'axios';
import {tokens, bootcamps } from '../models/ModelApi.js';
const API_URL = "http://localhost:3000/api"

/*
URL: /api/auth/bootcamps/all
Metodo: GET
Autenticación: Bearer Token
Descripción: Devuelve una lista de todos los bootcamps.
Respuestas: 200: Devuelve un array de bootcamps.
*/

 
export async function obtenerBootcamps(authToken) {

    try {
        const response = await axios.get(`${API_URL}/auth/bootcamps/all`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error al obtener bootcamps: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error al obtener bootcamps:", error);
        throw error;
    }
}
   