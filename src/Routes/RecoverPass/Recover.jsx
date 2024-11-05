

export default function Recover() {
  return (
    <>
        <h1>Recover</h1>
        <p>Inserte su correo electronico, para iniciar el proceso de recuperación de contraseña</p>
        <div id="recover" className="page">
            <form action="">
                <label >
                    <span>Email: </span>
                    <input type="text" name="email"/>
                    <button>✔</button>
                </label>
            </form>
        </div>
    </>
  )
}

