import { useState } from 'react';
import { useUser } from '../../UserContext.jsx';
import './Avatar.css';

function Avatar() {
    const [user, enhancedSetUser] = useUser();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    console.log('Mi usuario', user);
    //capturamos el contenido del input al seleccionar una imagen desde nuestro pc
    const handleFile = (e) => {
        setFile(e.target.files[0]);
        console.log('Imagen seleccionada:', e.target.files[0]);

        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    //subida del archivo mediante PUT
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar error previo
        setSuccess(false); // Limpiar éxito previo
        console.log('Subiendo imagen:', file);

        if (!file) {
            setError('Por favor, seleccione un archivo antes de continuar.');
            return;
        }

        try {
            const fd = new FormData();
            fd.append('avatar', file);

            const res = await fetch('http://localhost:3000/users/avatar', {
                method: 'PUT',
                headers: {
                    ...(user?.token && {
                        Authorization: user.token.token,
                    }),
                },
                body: fd,
            });

            await res.json();

            setSuccess(true);

            // Ahora hacemos un GET para actualizar la información del usuario, incl. el avatar
            const resUser = await fetch(
                `http://localhost:3000/users/${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `${user.token.token}`,
                    },
                }
            );

            if (!resUser.ok) {
                throw new Error('Error al obtener la información del usuario');
            }

            const dataUser = await resUser.json();
            console.log('RESULTADOOOOO:', dataUser.data.avatar);

            // Actualizamos el estado global del usuario con la nueva información, incluyendo el avatar
            enhancedSetUser({
                ...dataUser.data.user,
                token: user.token, // No sobrescribir el token
                location: user.location,
            });
            /* setUser({
                ...dataUser.data.user,
                token: user.token,
                location: user.location,
            }); */
        } catch (error) {
            setError(`Ocurrió un error: ${error.message}`);
        }
    };

    return (
        <div id="upload" className="areaFormulario">
            <h3>Foto de perfil:</h3>
            <form onSubmit={handleSubmit}>
                <label id="subida">
                    {preview ? (
                        <img
                            className="image-preview"
                            src={preview}
                            alt="Avatar Preview"
                        />
                    ) : (
                        <div className="add-image" />
                    )}
                    <input type="file" onChange={handleFile} />
                </label>
                <button type="submit">Actualizar imagen</button>
            </form>
            {success && (
                <div>
                    Imagen subida con éxito!
                    <br />
                    <a
                        //href={avatarUrl} // Asegúrate de que se está mostrando la URL correctamente
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver Avatar
                    </a>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Avatar;
