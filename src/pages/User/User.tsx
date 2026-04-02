import React, { useState } from "react";
import type { userAuth } from "../../utils/api";
import TablaUser from "./components/TablaUser";
import "./User.css";
import EditUser from "./components/EditUser";

type userProps = {
  data: userAuth;
  onDisconnect: () => void;
};

type stateUser =
  | {
      status: "idle";
      data: userAuth;
    }
  | { status: "edit" }
  | { status: "delete" }
  | { status: "close" };

export default function User({ data, onDisconnect }: userProps) {
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
        setUser({ status: "close" });
        onDisconnect()
        break;
    }
  }

  function checkActive(status: string) {
    return user.status === status ? "panel-button active" : "panel-button";
  }
  return (
    <div className="user-page">
      <div className="user-header">
        <div className="ctm">ctm</div>
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
          {user.status === "edit" && (
            <EditUser></EditUser>
          )}
        </>
      </div>
    </div>
  );
}
