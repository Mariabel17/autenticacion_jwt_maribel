import { useState } from "react"

export function Register(){
    const [username, setUsername] = useState("")
    const [useremail, setUseremail] = useState("")
    const [userpassword, setUserpassword] = useState("")

 
async function handleSubmit(e){ 
     e.preventDefault()
    await fetch("",{
        method: "POST",
        headers: "",
        body: JSON.stringify({
            "email": useremail,
            "username": username,
            "password": userpassword
        })
    })

 }

    return(
      <div className="container d-flex justify-content-center align-items-center min-vh-100"> 
      <div className="card shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
      <div className="card-body p-4">
      <h3 className="text-center mb-4">Crear cuenta</h3>
      
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={useremail}
                onChange={(e)=>setUseremail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={userpassword}
                onChange={(e)=>setUserpassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>

          </div>
          </div>
      </div>
    )
}