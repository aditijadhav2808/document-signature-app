import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/login", null, {
        params: {
          email,
          password,
        },
      });

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      alert("Login Successful!");

      console.log(
        localStorage.getItem("token")
      );
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged Out");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <button
        onClick={logout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}