// src/App.js
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FaEye } from "react-icons/fa";
import app from "../../firebase.config";
const auth = getAuth(app);

const LoginPage = () => {
  const [isOpen,setIsOpen] = useState(true)
  const [email, setEmail] = useState("abc@gamil.com");
  const [password, setPassword] = useState("123456");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    //login with email password=================================
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login user === ", user);
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
const handleHidden = ()=>{
  setIsOpen(!isOpen)

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="flex items-center relative">
              <input
                type={isOpen ? "password" : 'text'}
                required
                id="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="absolute right-5 cursor-pointer" onClick={handleHidden}><FaEye /></div>
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Login
            </button>
            <p className="text-right font-semibold text-gray-600 text-sm my-2">
              Not have account?go to
              <Link to="/signIn" className="text-blue-400 hover:text-blue-600">
                Registration
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

function Login() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default Login;
