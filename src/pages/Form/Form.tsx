import { useState } from "react";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Button from "../../components/Button";
import { getUser } from "../../service/api";
import type { propsForm } from "../../types/typeProps";
import type { stateForm } from "../../types/typeStates";
import type { userAuth } from "../../types/typeService";
import "./Form.css";

export default function Form({ onLoad, onSubmit }: propsForm) {
  const [form, setForm] = useState<stateForm>({ status: "login" });

  function handleLogin() {
    setForm({ status: "login" });
  }
  function handleRegister() {
    setForm({ status: "register" });
  }

  async function handleLoginSubmit() {
    try {
      const res: userAuth = await getUser<userAuth>("/api/auth/me");
      onSubmit({ status: "success", data: res });
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
                textContent="Log In"
              ></Button>
              <Button
                id="register"
                onClick={handleRegister}
                textContent="Sign Up"
              ></Button>
            </div>
          </div>
          <div className="form-titles">
            <div className="titles-container">
              <div className="title">
                <h1>Welcome</h1>
              </div>
              <div className="subtitle">
                <h2>{form.status === "login" ? "Log In" : "Sign Up"}</h2>
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
