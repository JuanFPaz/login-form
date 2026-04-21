import { useState, useEffect } from "react";
import Input, { CheckBox } from "../../../../components/Input";
import { postLogin } from "../../../../service/api";
import type { stateMessage } from "../../../../types/typeStates";
import type { propsLogin } from "../../../../types/typeProps";
import type { LoginResponse, UserLogin } from "../../../../types/typeService";

export default function Login({ onLoad, onSubmit }: propsLogin) {
  const [message, setMessage] = useState<stateMessage>({ status: "idle" });

  useEffect(() => {
    if (message.status === "success") alert(message.data);
    if (message.status === "error") alert(message.error);
  }, [message]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoad({ status: "load" });
    const fd: FormData = new FormData(event.currentTarget);
    const bodyUser: UserLogin = {
      username: fd.get("username") as string,
      password: fd.get("password") as string,
    };
    const rememberUser = fd.get("rememberme");

    try {
      const res: LoginResponse = await postLogin<LoginResponse>(
        "/api/auth/login",
        bodyUser,
      );
      setMessage({ status: "success", data: res.message });
      if (rememberUser) localStorage.setItem("remember", "on");
      onSubmit(res.access_token);
    } catch (err) {
      setMessage({ status: "error", error: (err as Error).message });
      onLoad({ status: "idle" });
    }
  };

  return (
    <form className="form-login" id="form-login" onSubmit={handleSubmit}>
      <Input
        id="username"
        className="input"
        type="text"
        textContent="Usuario"
        required={true}
      />
      <Input
        id="password"
        className="input"
        type="password"
        textContent="Contraseña"
        required={true}
      />
      <CheckBox
        id="rememberme"
        className="checkbox"
        type="checkbox"
        textContent="Mantener sesion iniciada"
        required={false}
      />
      <a target="_blank" href="#">Olvide la contraseña</a>
      <button type="submit" className="submit">
        Iniciar Sesion
      </button>
    </form>
  );
}
