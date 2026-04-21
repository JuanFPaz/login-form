import { useState, useEffect } from "react";
import Input from "../../../../components/Input";
import { postSignUp } from "../../../../service/api";
import type { stateMessage } from "../../../../types/typeStates";
import type { propsSignUp } from "../../../../types/typeProps";
import type { ApiResponse, UserRegister } from "../../../../types/typeService";

export default function SignUp({ onLoad, onSubmit }: propsSignUp) {
  const [message, setMessage] = useState<stateMessage>({ status: "idle" });

  useEffect(() => {
    if (message.status === "success") alert(message.data);
    if (message.status === "error") alert(message.error);
  }, [message]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoad({ status: "load" });
    const fd: FormData = new FormData(event.currentTarget);
    const bodyUser: UserRegister = {
      username: fd.get("username") as string,
      password: fd.get("password") as string,
        name: fd.get("name") as string,
        lastname: fd.get("lastname") as string,
        email: fd.get("email") as string,
        birthday: fd.get("birthday") as string, // OUTPUT -> YYYY-MM-DD es lo que necesita la base de datos.
        country: fd.get("country") as string,
    };
    try {
      const res = await postSignUp<ApiResponse>("/api/auth/register", bodyUser);
      setMessage({ status: "success", data: res.message });
      onSubmit();
    } catch (err) {
      setMessage({ status: "error", error: (err as Error).message });
    }
    onLoad({ status: "idle" });
  };
  return (
    <form className="form-signup" id={"form-signup"} onSubmit={handleSubmit}>
      <Input
        id="name"
        className="input"
        type="text"
        textContent="Nombre"
        required={true}
      />
      <Input
        id="lastname"
        className="input"
        type="text"
        textContent="Apellido"
        required={true}
      />
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
      <Input
        id="repeatpass"
        cut="cut-long"
        className="input"
        type="password"
        textContent="Repetir Contraseña"
        required={true}
      />
      <Input
        id="email"
        cut="cut-short"
        className="input"
        type="email"
        textContent="Email"
        required={true}
      />
      <Input
        id="birthday"
        className="input"
        type="date"
        textContent="Fecha de Nacimiento"
        required={true}
      />
      <Input
        id="country"
        cut="cut-medium"
        className="input"
        type="text"
        textContent="País"
        required={true}
      />
      <button type="submit" className="submit">
        Crear Cuenta
      </button>
    </form>
  );
}
