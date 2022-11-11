import React, { useEffect, useState } from 'react'
import axios from 'axios'


import { useNavigate } from 'react-router-dom'

function Home() {

    const [user, setUser] = useState('')
    const userId = user._id
    const initialValues = { address1: "", address2: "", landmark: "", postoffice: "", pincode: "", gaurdianname: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [message, setMessages] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('loginInfo'))
        setUser(user)
        if (user) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    console.log(formValues);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("hiiiiiiiiii");
        e.preventDefault()

        // const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // if (email.test(formValues.email)) {
        //     setMessages("")
        // } else if (!email.test(formValues.email)) {
        //     setMessages("Email is not valid")
        // }
        // else {
        //     setMessages("")
        // }
        if (formValues.address1.length === 0 && formValues.address2.length === 0 && formValues.landmark.length === 0 && formValues.postoffice.length === 0 && formValues.pincode.length === 0 && formValues.gaurdianname.length === 0) {
            setError("true")
        }

        if (formValues.address1.length !== 0 && formValues.address2.length !== 0 && formValues.landmark.length !== 0 && formValues.postoffice.length !== 0 && formValues.pincode.length !== 0 && formValues.gaurdianname.length !== 0) {
            try {

                await axios.post(`/user-detail`, { formValues, userId })
                setFormValues(initialValues)
            } catch (error) {
                setMessages(error.response.data.message)
                console.log(error);
            }

        }
    }


    const logout = () => {
        localStorage.removeItem("loginInfo");
        navigate(`/login`);
    }


    return (
        <div>
            <div className='h-screen bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                <div className=' '>

                </div><br />
                <div className='bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                    <form onSubmit={handleSubmit}
                        className='shadow-black w-fuautoll   mx-auto bg-white p-8 px-8 rounded-3xl'

                    >
                        <div className='flex justify-center gap-5 '>
                            <h1 className='font-bold text-center text-2xl '>{user.name}</h1>
                            <input disabled className='flex justify-end rounded-sm bg-gray-200 w-32 focus:border-blue-500 focus:bg-grey-800'
                                placeholder={user.isAdmin === "true" ? "Privillage : Admin" : "Privillage : User"}
                                type="text"
                                name='name'
                            />
                        </div>
                        <br />
                        <span className='flex font-bold justify-center text-red-500'>{message}</span>

                        <div className='flex flex-col text-grey-500 py-2'>
                            <div className='flex gap-3'>
                                <input disabled className=' rounded-sm bg-gray-200 mt-2 p-2'
                                    placeholder={user.name}
                                />
                                <br />

                                <input disabled className=' rounded-sm bg-gray-200 mt-2 p-2'
                                    placeholder={user.email}
                                />
                                <br />
                            </div>
                            <div className='flex gap-3'>
                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Address 1'
                                    type="text"
                                    name='address1'
                                    value={formValues.address1}
                                    onChange={handleChange}
                                /><span className='flex flex-col'>{error && formValues.address1.length <= 0 ?
                                    <label style={{ color: "red" }} >Address 1 cannot be empty </label> : ""}</span>
                                <br />


                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Address 2'
                                    type="text"
                                    name='address2'
                                    value={formValues.address2}
                                    onChange={handleChange}
                                />
                                <span>{error && formValues.address2.length <= 0 ?
                                    <label style={{ color: "red" }} >Address 2 cannot be empty </label> : ""}</span>
                                <br />
                            </div>
                            <div className='flex gap-3'>
                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Land Mark'
                                    type="text"
                                    name='landmark'
                                    value={formValues.landmark}
                                    onChange={handleChange} />
                                <span>{error && formValues.landmark.length <= 0 ?
                                    <label style={{ color: "red" }} >Landmark cannot be empty </label> : ""}</span>
                                <br />


                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Post Office'
                                    type="text"
                                    name='postoffice'
                                    value={formValues.postoffice}
                                    onChange={handleChange}
                                />
                                <span>{error && formValues.postoffice.length <= 0 ?
                                    <label style={{ color: "red" }} >Post Office cannot be empty </label> : ""}</span>
                                <br />
                            </div>
                            <div className='flex gap-3'>

                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Pin Code'
                                    type="number"
                                    name='pincode'
                                    value={formValues.pincode}
                                    onChange={handleChange}
                                />
                                <span>{error && formValues.pincode.length <= 0 ?
                                    <label style={{ color: "red" }} >Pincode cannot be empty </label> : ""}</span>
                                <br />

                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                    placeholder='Gaurdian Name'
                                    type="text"
                                    name='gaurdianname'
                                    value={formValues.gaurdianname}
                                    onChange={handleChange}
                                />
                                <span>{error && formValues.gaurdianname.length <= 0 ?
                                    <label style={{ color: "red" }} >Gaurdian Name cannot be empty </label> : ""}</span>
                                <br />

                            </div>
                        </div>

                        <div className='flex gap-5 justify-center text-gray-500 py-2'>
                            <button onSubmit={handleSubmit} className=' w-sm  px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                                submit
                            </button>
                            <button onClick={logout} className=' w-sm  px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                                Logout
                            </button>
                        </div>
                    </form>
                </div>

            </div>




            {/* </div > */}
        </div >
    )
}

export default Home
