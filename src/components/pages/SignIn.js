// src/App.js
import React, {  useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  
} from "firebase/auth";
import app from "../../firebase.config";


import { Link } from "react-router-dom";

const auth = getAuth(app);

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    console.log("User", user);
    //firebase login and update user name =========================================================
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("firebase user", user);
        //update user name==================================
        updateProfile(auth.currentUser, { displayName: username })
          .then(() => {
            console.log(" user name updated");
          })
          .catch((error) => {
            console.log("error occurred when user name was updated");
          });
        // update =====================================
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
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
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
            <p className="text-right font-semibold text-gray-600 text-sm my-2">
              already Registration?go to <Link to="/login" className="text-blue-400 hover:text-blue-600">Login </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

function SignIn() {
  return (
    <div>
      <RegistrationPage />
    </div>
  );
}

export default SignIn;
