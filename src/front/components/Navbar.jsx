import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")

    function handleLogout(){
        sessionStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="d-flex gap-2">
                    {!token ? (
                        <>
                            <Link to="/register">
                                <button className="btn btn-outline-primary">Register</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                        </>
                    ) : (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};