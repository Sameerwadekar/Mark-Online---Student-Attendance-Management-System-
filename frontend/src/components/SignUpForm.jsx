import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { handleError, handleSuccess } from "./utils";
import LoadingBar from "react-top-loading-bar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LoginForm() {
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [SignUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...SignUpInfo, [name]: value });
  };

  const handleOnClick = () => {
    setProgress(30);
    setTimeout(() => setProgress(60), 300);
    setTimeout(() => setProgress(100), 600);
    setTimeout(() => navigate("/login"), 700);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignUpInfo;

    if (!name || !email || !password) {
      handleError("Please fill in all required fields.");
      return;
    }

    try {
      setProgress(30);
      const url = "http://localhost:5000/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignUpInfo),
      });

      setProgress(60);
      const result = await response.json();
      const { success, message, error } = result;

      if (response.status === 409) {
        handleError(message || "User already exists. Please login.");
        setProgress(100);
        return;
      }

      if (success) {
        handleSuccess(message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setProgress(100);
      } else {
        handleError(error || "Signup failed. Please try again.");
        setProgress(100);
      }
    } catch (error) {
      handleError(error.message || "Something went wrong.");
      setProgress(100);
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
            Your trusted platform for managing attendance efficiently and
            effortlessly.
          </p>
        </div>

        <div className="h-full w-1/2 flex items-center justify-center">
          <div className="flex flex-col w-3/4 max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Create An Account
            </h1>

            <form onSubmit={HandleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="name"
                  name="name"
                  value={SignUpInfo.name}
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  name="email"
                  value={SignUpInfo.email}
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    value={SignUpInfo.password}
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
                    placeholder="Enter your password"
                    required
                    autoComplete="new-password"
                  />

                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
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
                Signup
              </button>
            </form>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline"
                onClick={handleOnClick}
              >
                Login
              </a>
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
