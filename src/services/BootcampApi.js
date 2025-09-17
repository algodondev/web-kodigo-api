
import axios from 'axios';
import { tokens, bootcamps } from '../models/ModelApi.js';
const API_URL = "http://localhost:3000/api"

/*
URL: /api/auth/bootcamps/all
Metodo: GET
Autenticación: Bearer Token
Descripción: Devuelve una lista de todos los bootcamps.
Respuestas: 200: Devuelve un array de bootcamps.
*/

// Obtener todos los bootcamps
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

/*
URL: /api/auth/bootcamps/create
**- Metodo: POST
Autenticación: Bearer Token
Descripción: Crea un nuevo bootcamp.
** Body **:
{
  "name": "nombre",
  "description": "Descripción",
  "technologies": ["tecnología1", "tecnología2"]
}
Respuestas: 200: Bootcamp creado correctamente. 200: El bootcamp ya existe y se activo correctamente.
*/

// Crear un nuevo bootcamp
export async function crearBootcamp(authToken, bootcampData) {
    try {
        const response = await axios.post(`${API_URL}/auth/bootcamps/create`, bootcampData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log("Respuesta del servidor:", response.data.message || "Bootcamp creado");
            return response.data;
        } else {
            throw new Error(`Error al crear bootcamp: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error al crear bootcamp:", error);
        throw error;
    }
}