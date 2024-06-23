import { Link, Navigate } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';
import { useContext, useState } from "react";
import { userContext } from "../UserContext";



export default function Register() {
   
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const {setUserInfo} = useContext(userContext);
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(ev){
    ev.preventDefault(); 
    if(confirmPassword === password)
    {
        const response= await fetch('https://taskmanagerapi-bhku.onrender.com/api/user/register',{
            method:'POST',
            body: JSON.stringify({username,email,password}),
            headers:{'Content-type':'application/json'},
            credentials: 'include',
           })
           if(response.status !==200)
            {
                toast.error('register failed')
            }
            else{
                 response.json().then(userInfo=>{
                     setUserInfo(userInfo)
                     setRedirect(true);
                 })
            }
           
    }
    else
    {
        toast.error("password didn't match");
    }
   }

   if(redirect)
    {
        return <Navigate to="/"/>
    }


    return (
        <>
        <Toaster />
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
                <h2 className="text-xl font-semibold mb-6 text-center">REGISTER</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{setUserName(e.target.value)}}
                        required
                    />
                    <input
                        type="text"
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        required
                    />
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Already have an account?</p>
                    <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
                </div>
            </div>
        </div>
        </>
    );
}