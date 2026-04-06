import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login(){
    const [useremail, setUseremail] = useState("")
    const [userpassword, setUserpassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setError("")

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": useremail,
                "password": userpassword
            })
        })

        const data = await resp.json()

        if(resp.ok){
            sessionStorage.setItem("token", data.token)  // ← guarda el JWT
            navigate("/private")                          // ← redirige a privada
        } else {
            setError(data.msg)
        }
    }

    return(
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
      <div className="card-body p-4">
      <h3 className="text-center mb-4">Iniciar sesión</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={useremail}
                onChange={(e)=>setUseremail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={userpassword}
                onChange={(e)=>setUserpassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>

            <p className="text-center mt-3 mb-0">
              ¿No tienes cuenta? <a href="/register">Regístrate</a>
            </p>
          </form>

          </div>
          </div>
      </div>
    )
}