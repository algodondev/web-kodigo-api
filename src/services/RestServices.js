/*
rest  servicios para la api de bootcamps 
*/
import axios from 'axios';
import {tokens } from '../models/ModelApi.js';
const API_URL = "http://localhost:3000/api"




/***
 * - **URL**: `/api/auth/register`
 * - **Metodo**: `POST`
 * - **Descripción**: Crea un nuevo usuario en el sistema.
 * - ** - ** Body **:
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
- Respuestas:
201: Usuario registrado correctamente.
400: El usuario ya existe.
*/
export async function registrarUsuario(user) {
    if (!user || !user.username || !user.password) {
        throw new Error("El objeto user debe contener username y password");
    }

  try {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    if (response.status === 201) {
      console.log("Usuario registrado correctamente");
      return response.data;
    } else {
      throw new Error(`Error al registrar usuario: ${response.statusText}`);
    }

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}



/*
## **Inicio de sesión**
- **URL**: `/api/auth/login`
- **Metodo**: `POST`
- **Descripción**: Permite a un usuario autenticarse.
- ** Body **:
```json
 
{
  "username": "usuario",
  "password": "contraseña"
}
```
- Respuestas:
200: Devuelve un token de Autenticación.
400: Credenciales inválidas.
*/

export async function loginUsuario(user) {
    if (!user || !user.username || !user.password) {
        throw new Error("El objeto user debe contener username y password");
    }

  try {
    const response = await axios.post(`${API_URL}/auth/login`, user);
    if (response.status === 200) {
      console.log("Usuario autenticado correctamente");
        const token =new tokens();
        token.Authorization = response.data.token;
        console.log("Token recibido:", token);
      // Guardar el token en el almacenamiento local
        localStorage.setItem('Token', token.Authorization);
      return response.data;
    } else {
      throw new Error(`Error al autenticar usuario: ${response.statusText}`);
    }
    } catch (error) {
    console.error("Error al autenticar usuario:", error);
    throw error;
  }
}

/*
** Verificar token de autenticación **
URL: /api/auth/dashboard
Método: GET Middleware (llamado en cada endpoint protegido)
Descripción: Verifica si el token de autenticación (JWT) es válido. Se debe enviar el token en el header de la solicitud.
Header:
{
  "Authorization": "Bearer <token>"
}
Respuestas:
403: Token requerido (si no se envía el token).
401: Token inválido (si el token no es válido o ha expirado).
200: Autenticación exitosa, devuelve un objeto userLogin.
*/

export async function verificarAutenticacion() {
    const token = localStorage.getItem('Token');

    if (!token) {
        throw new Error('Token no encontrado');
    }

    try {
        const response = await axios.get(`${API_URL}/auth/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data; // devuelve objeto userLogin
        } else {
            throw new Error(`Error al verificar autenticación: ${response.statusText}`);
        }
    } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token inválido o expirado, limpiar localStorage
            localStorage.removeItem('Token');
            throw new Error('Token inválido o expirado');
        }
        console.error("Error al verificar autenticación:", error);
        throw error;
    }
}