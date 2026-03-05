import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let isValid = true;

    //     if (!validateEmail(email)) {
    //         setEmailError("Please enter a valid email address");
    //         isValid = false;
    //     } else {
    //         setEmailError("");
    //     }

    //     if (password.length < 6) {
    //         setPasswordError("Password must be at least 6 characters");
    //         isValid = false;
    //     } else {
    //         setPasswordError("");
    //     }

    //     if (!isValid) return;

    //     localStorage.setItem("isAuthenticated", "true");
    //     navigate("/dashboard");
    // };

    const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    return;
  }

  // ✅ Save auth + email
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userEmail", email);

  navigate("/dashboard");
};
    return (
        <div className="login-wrapper">
            {/* LEFT BRAND SECTION */}
            <div className="login-left">
                <div className="brand-content">
                    <div className="logo-content">
                        <div className="brand-logo">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-check-big h-6 w-6 text-primary-foreground"><path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path><path d="m9 11 3 3L22 4"></path></svg></span>
                        </div>
                        <h2>TaskFlow</h2>
                    </div>
                    <p>
                        Organize your work, hit your deadlines, and achieve more — all in
                        one beautifully simple dashboard.
                    </p>

                    <ul>
                        <li>Create & manage tasks effortlessly</li>
                        <li>Filter by priority and status</li>
                        <li>Track progress in real time</li>
                    </ul>
                </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="login-right">
                <div className="login-card">
                    <h3>Welcome back</h3>
                    <p className="text-muted">Sign in to access your dashboard</p>

                    {error && (
                        <div className="alert alert-danger py-2 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="form-label">Email</label>

                        </div>
                        <div className="position-relative mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{
                                position: "absolute",
                                top: "50%",
                                left: "12px",
                                transform: "translateY(-50%)",
                                width: "17px",
                                pointerEvents: "none"
                            }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>

                            <input
                                type="email"
                                className="form-control ps-5"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        {emailError && (
                            <div className="text-danger small mb-3">{emailError}</div>
                        )}
                        <div className="">
                            <label className="form-label">Password</label>

                        </div>
                        <div className="position-relative mb-1">


                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{
                                position: "absolute",
                                top: "50%",
                                left: "12px",
                                width: "17px",
                                transform: "translateY(-50%)",
                                pointerEvents: "none"
                            }} ><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <input
                                type="password"
                                className="form-control ps-5"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {passwordError && (
                            <div className="text-danger small mb-3">{passwordError}</div>
                        )}
                        <button type="submit" className="btn btn-orange w-100">
                            Sign In <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </button>

                        <small className="text-muted d-block text-center mt-3">
                            Use any email and password (6+ chars) to continue
                        </small>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;