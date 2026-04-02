# 🐾 Login Form

Aplicación web desarrollada con **React + TypeScript** para modelar y gestionar una formulario de **inicio de inicio** y **registro de usuario nuevo**.

---

## 🧠 Arquitectura

El proyecto está dividido conceptualmente en tres capas:

### 🔹 App.tsx (Componente Principal)

Encapsula la lógica global de la aplicación:

* Estados del componente:

  * `app` : Estado global de la aplicación. Por defecto su valor es `none`.
  * `load`: Estado global del componente Loading. Por defecto su valor es `load`

* Métodos iniciales:

  * Cuando incia la aplicación, comprueba si hay una sesion guardada.
  * Si no existe una sesion guardada, establecemos el estado `app` como `idle` y load como `idle`.
  * Si existe, intentamos obtener el usuario autenticado. Si se consigue correctamente, establecemos el estado `app` como `success` y le pasamos la `data`.
  * Si ocurre un error intentando obtener el usuario autenticado, establecemos el estado `app` como `success`

---

## 🧩 Modelo de Estados

```ts
/*App.tsx*/
export type stateApp = { status: 'success', data: userAuth} | { status: 'idle' } | {status:'none'}
export type stateLoad = { status: 'idle' } | { status: 'load' }

/*User.tsx*/

/*Form.tsx*/
```

---

## 💾 Persistencia

Se utiliza `localStorage` para guardar y eliminar:

* `remember`

Este dato se guarda cuando iniciamos sesion, luego de marcar el `checkbox`. Cuando cerramos sesion, borramos este dato.

---

## 🛠️ Tecnologías

* React
* TypeScript
* CSS
* API fetch

---

## 🧪 Estado del proyecto

✔️ Funcional
✔️ Permite crear e ingresar un usuario nuevo
⚠️ Limitaciones en la persistencia de usuarios creados, debido a la falta de base de datos en la API.

---

## 📌 Aprendizajes clave

Este proyecto explora:

* Manejo de formularios de inicio y registro.
* Manejo de cookies a traves de API desarrollada con express.
* Persistencia en frontend
* Separación de responsabilidades

---

## 🙌 Autor

Desarrollado por **Juan Paz** como proyecto de práctica y exploración de lógica compleja en frontend.

---
