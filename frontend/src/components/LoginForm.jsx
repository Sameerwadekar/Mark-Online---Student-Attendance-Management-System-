import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignupClick = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate("/signup"), 900);
  };

  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const Handlelogin = async (e) => {
    e.preventDefault();
    console.log("Base URL is:", BASE_URL);
    const { email, password } = LoginInfo;

    if (!email || !password) {
      handleError("Please Fill All Required Fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleError("Please enter a valid email address.");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin") {
      setProgress(30);
      setTimeout(() => setProgress(100), 300);
      setTimeout(() => navigate("/admin"), 700);
      return;
    } else {
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(LoginInfo),
        });

        const result = await response.json();
        const { success, message, error, jwtToken, name } = result;

        if (success) {
          setProgress(30);
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("loggedInUser", name);
          setProgress(100);
          setTimeout(() => handleSuccess("Login successful!"), 300);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          setProgress(30);
          setTimeout(() => setProgress(100), 300);
          handleError(error || "Incorrect Email Or Password");
        }
      } catch (error) {
        setProgress(30);
        setTimeout(() => setProgress(100), 300);
        handleError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-purple-800 to-black text-white">
        <div className="h-full w-1/2 flex flex-col items-center justify-center p-8">
          <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow-2xl mb-8">
            <img
              src={logo}
              alt="Mark Online Logo"
              className="w-32 h-32 bg-transparent"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Mark Online</h1>
          <p className="text-lg m-3 text-gray-200 leading-relaxed text-center max-w-sm">
            Your Trusted platform for Managing attendance efficiently and
            effortlessly.
          </p>
        </div>

        <div className="h-full w-1/2 flex items-center justify-center">
          <div className="flex flex-col w-3/4 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
            <form onSubmit={Handlelogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email Address
                </label>
                <input
                  onChange={HandleChange}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your email"
                  required
                  value={LoginInfo.email}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={HandleChange}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your password"
                    required
                    value={LoginInfo.password}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={22} />
                    ) : (
                      <AiFillEye size={22} />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="text-purple-600 hover:underline cursor-pointer"
                onClick={handleSignupClick}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <LoadingBar
        color="#ff416c"
        height={3}
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
}

export default LoginForm;
