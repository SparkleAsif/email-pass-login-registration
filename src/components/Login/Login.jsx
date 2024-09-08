import React, { useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.config";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for password validation (example: minimum 8 characters, at least one letter and one number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validate email
    setError("");
    setSuccess("");
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      setSuccess("");
      return;
    }
    // If both validations pass
    setError("");
    setSuccess("Login successful!");

    // Here you would handle successful login, e.g., API call
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
          console.log("Invalid Email");
        }
        setSuccess("user login successful");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert('please provide your email address');
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('Please check your email! ')
    })
    .catch(()=>{
      console.log(error);
      setError("error.message");

    })
  };


  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              ref={emailRef}
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
 
          <div className="relative"> 
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'} // Toggle between text and password
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
        className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />} {/* Toggle icons */}
      </div>
    </div>
          <div>
            <p>
              New to this website? Please{" "}
              <Link className="text-blue-500" to="/register">
                {" "}
                Register
              </Link>{" "}
            </p>

            <p className="text-green-500 text-xl">{success}</p>
            <p className="text-red-500 text-xl">{error}</p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-sky-400 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <p>
          <small className="text-blue-500">
            Forget Password?{" "}
            <button className="font-bold" onClick={handleResetPassword}>
              Reset Pass
            </button>
          </small>
        </p>
      </div>
    </div>
  );
}

export default Login;
