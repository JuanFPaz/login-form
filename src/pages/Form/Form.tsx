import { useState } from "react";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Button from "../../components/Button";
import { getUser } from "../../service/api";
import type { propsForm } from "../../types/typeProps";
import type { stateForm } from "../../types/typeStates";
import type {  AccessResponse } from "../../types/typeService";
import "./Form.css";

export default function Form({ onLoad, onSubmit }: propsForm) {
  const [form, setForm] = useState<stateForm>({ status: "login" });

  function handleLogin() {
    setForm({ status: "login" });
  }
  function handleRegister() {
    setForm({ status: "register" });
  }
5
  async function handleLoginSubmit(access_token:string) {
    try {
      const res: AccessResponse = await getUser<AccessResponse>("/api/auth/profile",access_token);
      onSubmit({ status: "success", data: res.data, access_token});
    } catch (error) {
      console.log(error);
    }
    onLoad({ status: "idle" });
  }

  async function handleRegisterSubmit() {
    setForm({ status: "login" });
  }

  return (
    <>
      <div className="form-page">
        <div className="form-card">
          <div className="form-buttons">
            <div className="buttons-container">
              <Button
                id="login"
                onClick={handleLogin}
                textContent="Iniciar Sesion"
              ></Button>
              <Button
                id="register"
                onClick={handleRegister}
                textContent="Registrarse"
              ></Button>
            </div>
          </div>
          <div className="form-titles">
            <div className="titles-container">
              <div className="title">
                <h1>Bienvenido</h1>
              </div>
              <div className="subtitle">
                <h2>{form.status === "login" ? "Iniciar Sesion" : "Crear Nueva Cuenta"}</h2>
              </div>
            </div>
          </div>
          <div className="form-container">
            {form.status === "login" && (
              <Login onLoad={onLoad} onSubmit={handleLoginSubmit} />
            )}
            {form.status === "register" && (
              <SignUp onLoad={onLoad} onSubmit={handleRegisterSubmit} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
