"use client"
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

const defaultUser = { email: "", password: "" };

const page = () => {

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const router = useRouter();

  // handling user inputs
  const [userDetails, setUserDetails] = useState(defaultUser);
  const handleChanges = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  //disable button handler
  useEffect(() => {
    if (userDetails.email.length > 0 && userDetails.password.length > 0) {
      setDisabledButton(false);
      return;
    }
  }, [userDetails])


  const handleLogin = async () => {
    try {
      setLoading(true);
      toast.loading("Logging in...");
      const response = await axios.post("/api/users/login", userDetails);
      console.log(response.data);
      router.push("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">

        <div className="flex items-center space-x-2">
          <label className="flex justify-center align-center">Email :</label>
          <input onChange={(e) => handleChanges(e)} name="email" type="email" className="bg-gray-800" />
        </div>

        <div className="flex items-center space-x-2">
          <label>Password :</label>
          <input onChange={(e) => handleChanges(e)} name="password" type="password" className="bg-gray-800" />
        </div>

        <div className="flex items-center space-x-2">
          {
            loading ? <p>Logging in... </p> : <button disabled={disabledButton}
              onClick={handleLogin}
              className={`px-4 py-2 rounded-md text-white font-semibold 
                          ${disabledButton ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'}
                        `}
            >
              Login
            </button>
          }
        </div>

        <div>
          <Link className='text-pink-400' href={"/signup"}>Visit Sign-Up </Link>
        </div>

      </div>

    </>
  )
}

export default page
