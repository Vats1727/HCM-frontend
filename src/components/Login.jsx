import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import doctor from "./Images And Icons/doctor_login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email_final = "doctor";
    const pass_final = "doctor";

    const admin_email = "admin";
    const admin_pass = "admin";

    if (email === email_final && password === pass_final) {
      navigate("/"); // replace with your route
    } else if (email === admin_email && password === admin_pass) {
      navigate("/admin"); // replace with your route
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-side,#125720 45% ,#263a2a 100%)",
        }}
      >
        <div
          id="container"
          className="container d-flex justify-content-center align-items-center min-vh-100"
        >
          <div className="border-0 rounded-4 p-4 bg-white">
            <div className="row">
              <div className="col-md-6">
                <div className="login-image left-box d-flex justify-content-center align-items-center">
                  <img
                    src={doctor}
                    className="img-fluid w-100 rounded-4 d-flex justify-content-center align-items-center"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <br />
                <h1
                  id="welcome-back"
                  className="p-1"
                  style={{ marginBottom: "25px" }}
                >
                  Welcome Back
                </h1>

                <form onSubmit={handleSubmit}>
                  <div id="doctor" className="row align-items-center">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label
                        className="floating-labels"
                        htmlFor="email"
                        style={{ marginLeft: "10px" }}
                      >
                        Email address
                      </label>
                    </div>
                    <div className="form-floating mt-3">
                      <input
                        type="password"
                        className="form-control"
                        id="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label
                        className="floating-labels"
                        htmlFor="pass"
                        style={{ marginLeft: "10px" }}
                      >
                        Password
                      </label>
                      <button
                        type="submit"
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          backgroundColor: "#263a2a",
                          color: "white",
                          width: "100%",
                        }}
                        className="mt-3 p-3 submit-button-login"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
