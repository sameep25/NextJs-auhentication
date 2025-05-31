"use client"
import { React, useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);


  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getUserDetails = async () => {
    try {
      const user = await axios.get("/api/users/user");
      setUserData(user.data.userData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleVerifyEmail = async () =>{
    console.log("clciked");
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] align-middle">
      <button
        onClick={handleLogout}
        className={`px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 hover:cursor-pointer`}
      >
        Logout
      </button>

      {
        userData ? <><div className="p-2 m-2 border-white border-1 rounded-2xl" >
          <Link href={`/profile/${userData && userData._id}`} >{userData && userData._id}</Link>
        </div></> : <></>
      }

      <button 
        onClick={handleVerifyEmail}
        className={`px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 hover:cursor-pointer`}
      >
        Verify Email
      </button>

    </div>
  )
}

export default page