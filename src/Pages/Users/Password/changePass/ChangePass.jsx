import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ChangePass.css";

export default function ChangePass() {
  const [email, setEmail] = useState("");
  const [recoverPassCode, setRecoverPassCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await fetch("http://localhost:3000/users/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, recoverPassCode, newPass }),
    });
    const json = await res.json();
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => navigate("/user/login"), 2000);
    } else {
      setError(
        json.error || "error al enviar la solicitud de cambio de contraseña"
      );
    }
  };

  return (
    <>
      <h1>Pagina de cambio de contraseña</h1>
      <p>
        Inserte su correo electronico, su codigo de contraseña y su nueva
        contraseña
      </p>
      <div id="recover" className="page">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email: </span>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>coidgo de cambio de contraseña: </span>
            <input
              type="text"
              name="recoverPass"
              value={recoverPassCode}
              onChange={(e) => setRecoverPassCode(e.target.value)}
            />
            <span>nueva contraseña: </span>
            <input
              type="text"
              name="newPass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <button>✔</button>
            {success && <p>cambio de contraseña realizada</p>}
            {error && <p>{error}</p>}
          </label>
        </form>
      </div>
    </>
  );
}
