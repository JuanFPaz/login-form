import Input from "../../../components/Input";

export default function DeleteUser() {
  return (
    <div className="user-edit">
      <form className="form-edit">
        <div className="edit-titulo">
          <h2>Borrar Cuenta</h2>
        </div>
        <Input
          id="userName"
          className="input"
          type="text"
          textContent="Ingrese el nombre de usuario"
          required={true}
        />
        <button type="submit" className="submit">
          Change Password
        </button>
      </form>
    </div>
  );
}
