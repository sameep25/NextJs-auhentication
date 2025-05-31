"use client"
import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'


const defaultUser = { email: "", password: "", username: "" };

const page = () => {

    const router = useRouter();
    const [disabledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setLoading(true);
            toast.loading('Signing-Up...')
            const response = await axios.post("/api/users/signup", userDetails);
            // console.log("Signup successfull", response.data);
            router.push("/login");
        } catch (error) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // handling user inputs
    const [userDetails, setUserDetails] = useState(defaultUser);
    const handleChanges = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    // disable button
    useEffect(() => {
        if (userDetails.email.length > 0 && userDetails.username.length > 0 && userDetails.password.length > 0) {
            setDisabledButton(false);
            return;
        }
        setDisabledButton(true);
    }, [userDetails])


    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen space-y-4">


                <div className="flex items-center space-x-2">
                    <label className="flex justify-center align-center">Username :</label>
                    <input onChange={(e) => handleChanges(e)} name="username" type="text" className="bg-gray-800" />
                </div>

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
                        loading ? <p>Processing ... </p> : <button disabled={disabledButton}
                            onClick={handleSignUp}
                            className={`px-4 py-2 rounded-md text-white font-semibold 
                                    ${disabledButton ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'}
                                `}
                        >
                            Sign-up
                        </button>
                    }
                </div>

                <div>
                    <Link className='text-pink-400' href={"/login"}>Visit Login</Link>
                </div>
                <Toaster position="bottom-left" />

            </div>

        </>
    )
}

export default page
