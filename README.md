# 🐾 Login Form


## 📷 Screenshots / Diagramas
Aplicación web (SPA) desarrollada con **React + TypeScript** encargada en la autenticacion de usuarios y gestion de su perfil, consumiendo la API REST [express-ts (por ahora se llama asi)](https://github.com/JuanFPaz/express-ts).

![previsualizacion](./docs/prev.PNG)

## ✨ Caracteristicas

- 🔐 Autenticación de usuarios con JWT
- 🍪 Manejo de sesiones mediante cookies httpOnly
- 🔄 Persistencia de sesión con auto-login (`Remember me`)
- 🌐 Comunicación con API mediante `fetch` y credenciales
- ⚙️ Arquitectura desacoplada (services, hooks, components)
- 🧠 Manejo de estado en el cliente

## 🚀 Instalación

```bash
git clone 
```

## 🧩 Arquitectura de la Aplicación

![arquitectura-form-login](./docs/arquitectura-form-login.drawio.png)

El proyecto está dividido conceptualmente en tres capas.  
Toda la aplicación se maneja como una única unidad funcional:


### 🎨 Cliente (React + Vite)

Se encarga de la interacción con el usuario y del consumo de la API.

- 🔐 **Signup**  
  Se conecta al servidor para registrar un nuevo usuario con sus datos.

- 🔑 **Login**  
  Se conecta al servidor para validar el usuario y la contraseña.

- 🚪 **Logout**  
  Se conecta al servidor para cerrar la sesión del usuario.

- 👤 **User**  
  Se conecta al servidor para consultar, editar y eliminar un usuario autenticado.

### ⚙️ Servidor (Node.js + Express)

Se encarga de procesar las peticiones, aplicar lógica y comunicarse con la base de datos.

- 🔐 **Signup**  
  Recibe la petición, consulta la base de datos y valida que no exista un usuario con el mismo username o email.

- 🔑 **Login**  
  Recibe la petición, valida que el usuario exista y genera el token de autenticación.

- 🚪 **Logout**  
  Recibe la petición y cierra la sesión del usuario autenticado eliminando el token.

- 👤 **User**  
  Recibe la petición, valida el token de acceso, consulta la base de datos y devuelve los datos del usuario autenticado.

### 🗄️ Base de Datos (MySQL)

Se encarga exclusivamente de la persistencia de datos.

- 💾 Almacena la información de los usuarios.
- 🔄 Recibe únicamente consultas desde el servidor.
- 🔒 Protege datos sensibles como contraseñas encriptadas.

## 🛠️ Stack Tecnológico

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Base de Datos: MySQL

## 📌 Estructura del proyecto

```bash
src/
 ├── components/
 ├── service/
 ├── pages/
 ├── types/
 ├── utils/
 ├── App.tsx
 ├── index.css
 └── main.tsx
```

- `components`: UI reutilizable
- `pages`: vistas principales (User y Form, con sus respectivos componentes)
- `services`: llamadas a la API
- `utils`:
- `types`:

## 🔒 Autenticación

El token **JWT** se almacena en cookies **httpOnly**, evitando que pueda ser accedido desde `JavaScript` (`document.cookie`) y reduciendo el riesgo de ataques XSS. Esto ocurre una vez que el usuario inicia sesión y el servidor valida sus credenciales, sin la necesidad de utilizar almacenamiento local para datos sensibles.

Si el usuario marca la opción `Remember me`, se almacena una referencia en el **cliente** que permite intentar restaurar automáticamente la sesión al iniciar la aplicación.

En este caso, el frontend realiza una petición al backend para verificar si existe una sesión válida mediante las cookies almacenadas por el navegador.

En caso contrario, la aplicación no intenta restaurar la sesión automáticamente.

## 🌐 Comunicación con la API

Las peticiones **HTTP** se centralizan en la carpeta `services`, utilizando la API `fetch`. Esto permite desacoplar la lógica de red de los componentes y manejar las respuestas de forma controlada para su posterior renderizado.

```ts
/*src/service/api.ts*/

import type { userRegister, userLogin } from "../types/typeService";
import { optionsGET, optionsPOST } from "../utils/options";

async function api<T>(url: string, options: RequestInit): Promise<T> {
  const res: Response = await fetch(PROD_URL + url, options);
  if (!res.ok) {
    if (res.status === 404) {
      const err: any = await res.json();
      throw new Error(`${err.status} - ${err.message}`);
    }

    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json() as T;
}

async function post<T>(url: string, options: RequestInit) {
  return await api<T>(url, options);
}

export async function getUser<T>(url: string): Promise<T> {
  return await api<T>(url, optionsGET());
}

export async function postLogin<T>(url: string, body: userLogin) {
  return await post<T>(url, optionsPOST(body));
}

export async function postSignUp<T>(url: string, body: userRegister) {
  return await post<T>(url, optionsPOST(body));
}

export async function postLogut<T>(url: string): Promise<T> {
  return await post<T>(url, optionsPOST());
}

```

En entornos **cross-origin**, es necesario habilitar el envío de credenciales tanto en el cliente como en el servidor para que las cookies sean incluidas automáticamente en las peticiones. Para ello, se utiliza la opción `credentials: 'include'` en cada request.

```ts
/*src/utils/options.ts*/

export function optionsPOST(body?:unknow): RequestInit {
  if (!body) {
    return {
      method: "POST",
      mode: "cors",
      credentials: "include",
    };
  }
  return {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export function optionsGET(): RequestInit {
  return {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
}
```