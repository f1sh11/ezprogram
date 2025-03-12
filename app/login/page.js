/*loginpage*/

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [role, setRole] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard"); 
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("⚠️ Please select your identity.");
      return;
    }
    if (!identifier || !password) {
      setError("⚠️ Please fill in all fields.");
      return;
    }
    if (role === "student" && !/^\d+$/.test(identifier)) {
      setError("⚠️ Student ID must be numeric.");
      return;
    }
    if (role !== "student" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      setError("⚠️ Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        role,
        identifier,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard"); 
    } catch (err) {
      setError("⚠️ Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login to Your Account
        </h2>

        {/* 身份选择 */}
        <label className="block font-medium mb-2 text-gray-700">Select Identity</label>
        <select 
          value={role} 
          onChange={(e) => {
            setRole(e.target.value);
            setIdentifier(""); // 切换身份时清空输入框
          }} 
          className="border p-2 w-full rounded mb-4"
        >
          <option value="">-- Choose Role --</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="alumni">Alumni</option>
          <option value="industry">Industry Professional</option>
        </select>

        {/* 登录身份输入框（学生用 ID，其他用 Email） */}
        <label className="block font-medium mb-2 text-gray-700">
          {role === "student" ? "Student ID" : "Email"}
        </label>
        <input
          type={role === "student" ? "text" : "email"}
          placeholder={role === "student" ? "Enter Student ID" : "Enter Email"}
          className="border p-2 w-full rounded mb-4 focus:ring-2 focus:ring-blue-500"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        {/* 密码输入框 */}
        <label className="block font-medium mb-2 text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 w-full rounded mb-4 focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin(e)} // 支持回车键登录
        />

        {/* 错误提示 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* 登录按钮 */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 w-full rounded transition duration-200"
        >
          Login
        </button>

        {/* 忘记密码 */}
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
