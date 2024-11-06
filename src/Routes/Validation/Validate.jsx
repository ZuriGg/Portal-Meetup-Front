import { useNavigate } from "react-router-dom";

function Validate() {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/user/login");
  };
  return (
    <>
      <h1>pagina de validacion </h1>
      <p>Usuario verificado correctamente</p>
      <button className="validateButton" type="button" onClick={handleclick}>
        Iniciar sesión
      </button>
    </>
  );
}

export default Validate;
