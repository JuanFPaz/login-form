import { useState } from "react";
import {
  type stateForm,
  type stateLoad,
  type stateApp,
} from "../../types/typeStates";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Button from "../../components/Button";
import "./Form.css";
import {
  getUserAuth,
  type userAuth,
} from "../../../../login-form/src/utils/api";

export default function Form({
  onLoad,
  onSubmit,
}: {
  onLoad: (stl: stateLoad) => void;
  onSubmit: (sta: stateApp) => void;
}) {
  const [form, setForm] = useState<stateForm>({ status: "login" });

  function handleLogin() {
    setForm({ status: "login" });
  }
  function handleRegister() {
    setForm({ status: "register" });
  }

  async function handleSubmit() {
    try {
      const res: userAuth = await getUserAuth<userAuth>("/api/auth/me");
      onSubmit({ status: "success", data: res });
    } catch (error) {
      console.log(error);
    }
    onLoad({ status: "idle" });
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
              <Login onLoad={onLoad} onSubmit={handleSubmit} />
            )}
            {form.status === "register" && <SignUp onSubmit={onLoad} />}
          </div>
        </div>
      </div>
    </>
  );
}
