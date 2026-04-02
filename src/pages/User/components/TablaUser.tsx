import type { userAuth } from "../../../utils/api";

type propsTablaUser={
    userAuth:userAuth
}

export default function TablaUser({userAuth}:propsTablaUser) {
  return (
    <>
      <div className="user-tabla">
        <div className="tabla-container">
          <div className="tabla-titulo">
            <h2>Informacion General</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Nombre de Usuario</td>
                <td>{userAuth.username}</td>
              </tr>
              <tr>
                <td>Nombre Completo</td>
                <td>
                  {userAuth.info.name} {userAuth.info.lastname}
                </td>
              </tr>
              <tr>
                <td>Fecha de Cumpleaños</td>
                <td>{userAuth.info.birthday}</td>
              </tr>
              <tr>
                <td>Correo Electronico</td>
                <td>{userAuth.info.email}</td>
              </tr>
              <tr>
                <td>Cuenta creada</td>
                <td>{userAuth.createdAt}</td>
              </tr>
              <tr>
                <td>Ultimo acceso al panel</td>
                <td>{userAuth.lastSession}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
