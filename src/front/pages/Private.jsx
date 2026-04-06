import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Private(){
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if(!token){
            navigate("/login")  // ← si no hay token, manda al login
        }
    }, [])

    function handleLogout(){
        sessionStorage.removeItem("token")  // ← borra el token
        navigate("/login")
    }

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-sm" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-4 text-center">
            <h3 className="mb-3">🔒 Página privada</h3>
            <p className="text-muted">Autenticación realizada correctamente.</p>
            <button className="btn btn-danger w-100" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
        </div>
        </div>
    )
}