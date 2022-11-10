import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import { Link, useNavigate } from 'react-router-dom'

function Signup() {


    const initialValues = { email: "", password: "", name: "", value: "", age: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [message, setMessages] = useState('')
    const [error, setError] = useState(false)



    const handleChange = (e) => {
        // const { name, value } = e.target;
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ]

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("hiiiiiiiiii");
        e.preventDefault()

        // const name = '^[a-zA-Z]+[a-zA-Z/s/.]+[/s]*$'
        // if (name.test(formValues.name)) {
        //     setMessages("")
        // } else if (!name.test(formValues.name)) {
        //     setMessages("Name is not valid")
        // }
        // else {
        //     setMessages("")
        // }

        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.test(formValues.email)) {
            setMessages("")
        } else if (!email.test(formValues.email)) {
            setMessages("Email is not valid")
        }
        else {
            setMessages("")
        }
        if (formValues.name.length === 0  && !email.test(formValues.email) && formValues.email.length === 0 && formValues.value.length === 0 && formValues.age.length === 0 && formValues.password.length === 0) {
            setError("true")
        }

        if ( email.test(formValues.email) && formValues.name.length !== 0 && formValues.email.length !== 0 && formValues.age.length !== 0 && formValues.value.length !== 0 && formValues.password.length !== 0) {
            try {

                await axios.post(`/signup`, formValues)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucessfully Signed In',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')
                console.log();
            } catch (error) {
                setMessages(error.response.data.message)
                console.log(error);
            }

        }
    }


    return (
        <div>
            <div className='h-screen bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                <div className='visible sm:invisible '>

                </div><br />
                <div className='bg-gradient-to-r from-violet-600 to-cyan-500 flex flex-col justify-center'>
                    <form onSubmit={handleSubmit}
                        className='shadow-black max-w-[400px] w-full   mx-auto bg-white p-8 px-8 rounded-3xl'

                    >
                        <h1 className='font-bold text-center text-2xl '> SIGN UP</h1>
                        <br />
                        <span className='flex font-bold justify-center text-red-500'>{message}</span>

                        <div className='flex flex-col text-grey-500 py-2'>
                            <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                placeholder='Name'
                                type="text"
                                name='name'
                                value={formValues.name}
                                onChange={handleChange}
                            /><span>{error && formValues.name.length <= 0 ?
                                <label style={{ color: "red" }} >Name cannot be empty </label> : ""}</span>
                            <br />


                            <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                placeholder='Email Address'
                                type="text"
                                name='email'
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <span>{error && formValues.email.length <= 0 ?
                                <label style={{ color: "red" }} >Email cannot be empty </label> : ""}</span>
                            <br />


                            <input className=' rounded-full bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                placeholder='Age'
                                type="number"
                                name='age'
                                value={formValues.age}
                                onChange={handleChange} />
                            <span>{error && formValues.age.length <= 0 ?
                                <label style={{ color: "red" }} >Age cannot be empty </label> : ""}</span>
                            <br />


                            <input className='rounded-full bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                placeholder='Password'
                                type="password"
                                name='password'
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <span>{error && formValues.password.length <= 0 ?
                                <label style={{ color: "red" }} >Password cannot be empty </label> : ""}</span>
                            <br />

                            <select name='value' onChange={handleChange} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                <option >
                                    select a value
                                </option>
                                {options.map((data, i) => (

                                    <option key={i} value={data.value}>
                                        {data.label}
                                    </option>
                                ))}

                            </select><span>{error && formValues.value.length <= 0 ?
                                <label style={{ color: "red" }} >select any</label> : ""}</span><br />
                        </div>

                        {/* <div className='flex justify-between text-gray-500 py-2'>
                            </div> */}


                        <button className=' w-full inline-block px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                            Signup
                        </button>






                        <div>
                            <Link to="/login">
                                Dont have an account? <span className='text-green-600'>Login</span>
                            </Link>

                        </div>



                    </form>
                </div>

            </div>




            {/* </div > */}
        </div >
    )
}

export default Signup
