import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';


const NotFound = () => {
    return (
            <div className='notFoundLiquid'>
                <h1>🤭 Página No Encontrada, creo que es error 400 noséqué😅</h1> 
                <p>Lo sentimos, pero la página que buscas no existe.</p> 
                <p>No nos vamos a engañar....has escrito mal la dirección 🤷‍♂️</p> 
                <Link to="/" className='comeBack'>Vuelve a intentarlo ooootra vez 🩷</Link>
            </div>
        

    )
}

export default NotFound;