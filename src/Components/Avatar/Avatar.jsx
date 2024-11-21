import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';
import './Avatar.css';

function Avatar() {
    const [user] = useUser();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Subiendo imagen:', file);

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
            setSuccess(data);
            if (data.url) {
                navigate(data.url);
            }
        } else {
            console.error('Error al subir el avatar:', data);
        }
    };

    return (
        <div id="upload" className="page">
            <h1>Foto de perfil:</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    {preview ? (
                        <img className="image-preview" src={preview} />
                    ) : (
                        <div className="add-image" />
                    )}
                    <input type="file" onChange={handleFile} />
                </label>
                <button>Subir</button>
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
