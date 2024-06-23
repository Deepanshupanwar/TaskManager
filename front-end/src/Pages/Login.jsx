import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../UserContext";
import toast, { Toaster } from "react-hot-toast";



export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUserInfo } = useContext(userContext);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await fetch('https://taskmanagerapi-bhku.onrender.com/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true);
      })
    }
    else {
      toast.error("Login Failed")
    }
  };

  if (redirect) {
    return <Navigate to="/" />
  }


  return (

    <>
    <Toaster/>
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">LOGIN</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account yet?</p>
          <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
    </>
  );
}