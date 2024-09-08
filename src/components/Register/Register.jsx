import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState ('');
  const [success,setSuccess] = useState('');

  
  const handleEmailChange = (event) => {
    console.log(event.target.value);
   // setEmail(event.target.value);
  };
  const handlePassBlur = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    setSuccess('');
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(name, email, password);
    //validate
    if(!/(?=.*[A-Z])/.test(password)){
      setError('please use upper case');
      return;
    }
     else if(!/(?=.*\d)/.test(password)){
      setError('use one charecter');
     }
     else if (password.length<6){
      setError('at lease 6 charecter');
     }
    //create user in firebase
    
    // eslint-disable-next-line no-undef
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      setError('');
      e.target.reset();
      setSuccess('User created Successfully')
      emailVerificationSend(result.user)
      updateUserData(result.user, name);
    })
    .catch(error =>{
      console.error(error.message);
      setError(error.message);
      
      
    })
  };
  const emailVerificationSend =(user)=>{
    sendEmailVerification(user)
    .then(result=>{
      console.log(result);
      alert('please verify your email')
    })
  }
  const updateUserData=(user, name)=>{
    updateProfile(user,{
      displayName: name
    } )
    .then(()=>{
      console.log('user name Updated')
    })
    .catch(error=>{
      setError(error.message)
    })
  }
  return (
    <div className="flex flex-col mt-10 justify-center items-center p-8 bg-white shadow-lg rounded-xl border border-gray-200 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-4 w-full"
      >
        <input
          onChange={handleEmailChange}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          required
        />
        <input
          onChange={handleEmailChange}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          required
        />
        <input
          onBlur={handlePassBlur}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-300"
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          required
        />
        <p>Already have account? Please <Link className="text-blue-600" to='/login' >Login</Link> </p>
        <p className="text-red-600">{error}</p>
        <p className="text-green-700">{success}</p>
        <input
          className="border rounded-xl p-3 w-full bg-sky-300 text-white cursor-pointer hover:bg-sky-400 transition duration-300"
          type="submit"
          value="Register"
        />
      </form>
      
    </div>
  );
};

export default Register;
