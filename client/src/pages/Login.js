import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
  console.log("Sending login request...");

  const res = await API.post("/auth/login", {
    email,
    password,
  });

  console.log("API Response:", res.data);

  localStorage.setItem("token", res.data.token);
  console.log("Token saved");

  localStorage.setItem("user", JSON.stringify(res.data.user));
  console.log("User saved");

  alert("Login Successful!");

  console.log("Navigating to /chat");

  navigate("/chat");

} catch (error) {
  console.log("ERROR:", error);

  if (error.response) {
    console.log("Response:", error.response.data);
  } else {
    console.log("Message:", error.message);
  }

  alert(error.response?.data?.message || error.message);
}
};


  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h1>ChatConnect 💬</h1>

      <h3>Welcome Back</h3>

      <form onSubmit={handleLogin}>
        
        <p
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  Don't have an account?{" "}
  <Link
    to="/register"
    style={{
      color: "#1976d2",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    Register
  </Link>
</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;