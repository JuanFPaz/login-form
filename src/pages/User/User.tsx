import React, { useState } from "react";
import TablaUser from "./components/TablaUser";
import EditUser from "./components/EditUser";
import type { stateUser } from "../../types/typeStates";
import type { propsUser } from "../../types/typeProps";
import "./User.css";
import DeleteUser from "./components/DeleteUser";

export default function User({ data, onDisconnect }: propsUser) {
  const [user, setUser] = useState<stateUser>({ status: "idle", data });
  function handleClick(e: React.MouseEvent) {
    switch (e.currentTarget.id) {
      case "idle":
        setUser({ status: "idle", data });
        break;
      case "edit":
        setUser({ status: "edit" });
        break;
      case "delete":
        setUser({ status: "delete" });
        break;
      case "close":
        onDisconnect();
        break;
    }
  }

  function checkActive(status: string) {
    return user.status === status ? "panel-button active" : "panel-button";
  }
  return (
    <div className="user-page">
      <div className="user-header">
      </div>
      <div className="user-main">
        <div className="user-panel">
          <div className="panel-titulo">
            <h1>Control de Cuenta</h1>
          </div>
          <div className="panel-group">
            <button
              id="idle"
              className={checkActive("idle")}
              onClick={handleClick}
            >
              Cuenta
            </button>
            <button
              id="edit"
              className={checkActive("edit")}
              onClick={handleClick}
            >
              Cambiar contraseña
            </button>
            <button
              id="delete"
              className={checkActive("delete")}
              onClick={handleClick}
            >
              Borrar Cuenta
            </button>
            <button
              id="close"
              className={checkActive("close")}
              onClick={handleClick}
            >
              Cerrar sesion
            </button>
          </div>
        </div>
        <>
          {user.status === "idle" && (
            <TablaUser userAuth={user.data}></TablaUser>
          )}
          {user.status === "edit" && <EditUser></EditUser>}
          {
            user.status === "delete" && <DeleteUser></DeleteUser>
          }
        </>
      </div>
    </div>
  );
}
