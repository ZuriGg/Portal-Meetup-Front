import { Link } from "react-router-dom"


function Validate() {
    return(
        <>
            <h1>pagina de validacion </h1>
            <p>Usuario verificado correctamente</p>
            <Link to="/loging" >
            <button className="validateButton" type="button" >Iniciar sesión</button>
            </Link>
        </>
    )
}

export default Validate