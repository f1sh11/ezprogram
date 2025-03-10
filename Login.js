import { useState, useEffect } from "react"; 
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [role, setRole] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(redirect || "/");
    }
  }, [redirect, router]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setIdentifier("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Please select your identity.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        role,
        identifier,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push(redirect || "/");
    } catch (err) {
      setError("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
        <label className="block font-medium mb-2 text-gray-700">Select Identity</label>
        <select 
          value={role} 
          onChange={handleRoleChange} 
          className="border p-2 w-full rounded mb-4"
        >
          <option value="">-- Choose Role --</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="alumni">Alumni</option>
          <option value="industry">Industry Professional</option>
        </select>

        <label className="block font-medium mb-2 text-gray-700">
          {role === "student" ? "Student ID" : "Email"}
        </label>
        <input
          type={role === "student" ? "text" : "email"}
          placeholder={role === "student" ? "Enter Student ID" : "Enter Email"}
          className="border p-2 w-full rounded mb-4"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label className="block font-medium mb-2 text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


