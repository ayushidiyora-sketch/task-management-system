    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "bootstrap/dist/css/bootstrap.min.css";
    function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
        setError("Invalid email format");
        return;
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
        }

        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-sm" style={{ width: "350px" }}>
            <div className="card-body">
            <h3 className="card-title text-center mb-4">Login</h3>

            {error && (
                <div className="alert alert-danger py-2 text-center">
                {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                Login
                </button>
            </form>

            <p className="text-center text-muted mt-3 mb-0">
                Don’t have an account?{" "}
                <span className="text-primary cursor-pointer">
                Sign up
                </span>
            </p>
            </div>
        </div>
        </div>
    );
    }

    export default Login;