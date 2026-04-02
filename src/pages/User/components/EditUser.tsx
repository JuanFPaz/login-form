import Input from "../../../components/Input";

export default function EditUser() {
  return (
    <div className="user-edit">
      <form className="form-edit">
        <div className="edit-titulo">
          <h2>Cambiar Contraseña</h2>
        </div>
        <Input
          id="currentPass"
          className="input"
          type="password"
          textContent="Contraseña Actual"
          required={true}
        />
        <Input
          id="newPass"
          className="input"
          type="password"
          textContent="Nueva Contraseña"
          required={true}
        />
        <Input
          id="repeatNewPass"
          className="input"
          type="password"
          textContent="Repetir Contraseña"
          required={true}
        />
      </form>
    </div>
  );
}
