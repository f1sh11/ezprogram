
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMenuClick = (route) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(route);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* 头部导航栏 */}
      <nav className="w-full bg-white shadow-md fixed top-0 flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Career Assistance</h1>
        <div className="flex space-x-6">
          <button onClick={() => handleMenuClick("/")} className="text-gray-700 hover:text-blue-500">
            Home
          </button>
          <button onClick={() => handleMenuClick("/community")} className="text-gray-700 hover:text-blue-500">
            Community
          </button>
          <button onClick={() => handleMenuClick("/profile")} className="text-gray-700 hover:text-blue-500">
            Profile
          </button>
          <button onClick={() => handleMenuClick("/chat")} className="text-gray-700 hover:text-blue-500">
            Chat
          </button>
          <button onClick={() => handleMenuClick("/resources")} className="text-gray-700 hover:text-blue-500">
            Resources
          </button>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                router.push("/");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button onClick={() => router.push("/login")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mt-24 flex flex-col items-center text-center px-4">
        <h2 className="text-4xl font-bold text-blue-700">Find Your Future Here</h2>
        <p className="text-gray-600 mt-2">Connect with mentors, explore resources, and start your career journey today.</p>
        
        {/* 搜索框 */}
        <div className="mt-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Search career resources..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* CTA 按钮 */}
        <div className="mt-6">
          <button onClick={() => handleMenuClick("/resources")} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Explore Resources
          </button>
        </div>
      </div>

      {/* 合作伙伴展示模块 */}
      <div className="mt-12 w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 text-center">Our Partners</h3>
        <div className="flex justify-around items-center mt-4">
          <img src="/partner1.png" alt="Partner 1" className="h-12" />
          <img src="/partner2.png" alt="Partner 2" className="h-12" />
          <img src="/partner3.png" alt="Partner 3" className="h-12" />
          <img src="/partner4.png" alt="Partner 4" className="h-12" />
        </div>
      </div>

      {/* 页脚 */}
      <footer className="mt-16 py-6 w-full text-center bg-gray-200">
        <p className="text-gray-600 text-sm">&copy; 2024 Career Assistance Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
