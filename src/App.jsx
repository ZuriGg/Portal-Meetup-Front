import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { useEffect } from "react";

//Importación del archivo de css principal (No editar sin consultar)
import "./App.css";

//Importación de todas las rutas
import Rutas from "./routes/Routes.jsx";

//Importación de header y Footer
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
    const location = useLocation();

    // useEffect para visualizar en la pestaña del navegador un texto según el endpoint
    useEffect(() => {
        if (location.pathname === "/") {
            document.title = "PORTAL MEETUP"; // En caso de estar en home
        } else if (location.pathname === "/user/register") {
            // En caso de estar en /user/register
            document.title = "Registro de usuario";
        } else if (location.pathname === "/user/Validate") {
            // En caso de estar en /user/Validate
            document.title = "Usuario verificado";
        } else if (location.pathname === "/user/Login") {
            // En caso de estar en /user/Login
            document.title = "Inicio de sesión";
        } else if (location.pathname === "/user/password") {
            // En caso de estar en /user/password
            document.title = "Cambio de contraseña";
        } else if (location.pathname === "/meetup/create") {
            // En caso de estar en /meetup/create
            document.title = "Creación de meetup";
        } else if (location.pathname === "/meetup/edit") {
            // En caso de estar en /meetup/edit
            document.title = "Edición de meetup";
        } else {
            document.title = "PORTAL MEETUP"; // En caso de no coincidir con ninguna ruta anteriormente especificada
        }
    }, [location]);

    return (
        <>
            <Header /> {/* Falta por crearse el header */}
            <main>
                <Router>
                    {/* Router permite el uso de "Switch" */}
                    <Switch>
                        {/* Switch es una herramienta de react-router-dom que permite imprimir solo la ruta que coincida con la url del navegador */}
                        <Rutas />
                        {/* Este componente hace las veces de "index" para importar todas las rutas a la vez, y "Switch" se encarga de asignar solo la ruta solicitada en la url o mediante un Navigate o "<a><a/>" */}
                    </Switch>
                </Router>
            </main>
            <Footer /> {/* Falta por crearse el footer */}
        </>
    );
}

export default App;
