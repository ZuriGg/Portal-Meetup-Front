import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';
import './Avatar.css';

function Avatar() {
    const [user, enhancedSetUser] = useUser();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar error previo
        setSuccess(false); // Limpiar éxito previo
        console.log('Subiendo imagen:', file);

        if (!file) {
            setError('Por favor selecciona un archivo antes de continuar.');
            return;
        }

        try {
            const fd = new FormData();
            fd.append('avatar', file);

            const res = await fetch('http://localhost:3000/users/avatar', {
                method: 'PUT',
                headers: {
                    ...(user?.token && {
                        Authorization: `${user.token.token}`,
                    }),
                },
                body: fd,
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                console.log('Nuevo avatar:', data.url);
                // Actualizar el estado global del usuario con la nueva URL del avatar
                enhancedSetUser((prevUser) => ({
                    ...prevUser,
                    avatar: data.url, // Asumiendo que el estado del usuario tiene un campo `avatar`
                }));

                //Redirigir
                if (data.url) {
                    navigate(data.url);
                }
            } else {
                setError(`${error}`);
            }
        } catch (err) {
            setError(`Ocurrió un error: ${err.message}`);
        }
    };

    return (
        <div id="upload" className="page">
            <h3>Foto de perfil:</h3>
            <form onSubmit={handleSubmit}>
                <label id="subida">
                    {preview ? (
                        <img className="image-preview" src={preview} />
                    ) : (
                        <div className="add-image" />
                    )}
                    <input type="file" onChange={handleFile} />
                </label>
                <button>Actualizar imagen</button>
            </form>
            {success && (
                <div>
                    Imagen subida con éxito!
                    <br />
                    <a href={success.url} target="_blank">
                        {success.url}
                    </a>
                </div>
            )}
        </div>
    );
}

export default Avatar;
