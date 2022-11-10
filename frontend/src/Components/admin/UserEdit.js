import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTelegramPlane, FaUserEdit } from 'react-icons/fa'

function UserEdit(props) {
    const [users, setUser] = useState('')
    const userId = props._id
    const [showModal, setShowModal] = useState(false);
    const initialValues = { name: "", email: "", value: "", address1: "", address2: "", landmark: "", postoffice: "", pincode: "", gaurdianname: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [message, setMessages] = useState('')
    console.log(users);
    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'premium', label: 'Premium' },
    ]

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("hiiiiiiiiii");
        try {

            await axios.post(`/edit-user`, { formValues, userId })
            setFormValues(initialValues)
        } catch (error) {
            setMessages(error.response.data.message)
            console.log(error);
        }


    }


    const close = async (e) => {
        //   setformValues(initialState)
        setShowModal(false)
    }

    const user = (async () => {
        try {
            const users = await axios.post(`/single-user`, { userId })
            setUser(users)
        } catch (error) {

            console.log(error);
        }
    })


    useEffect(() => {
        user()
    }, [])

    return (


        <div>
            <button
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaUserEdit size={30} />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-[30rem] my-6 mx-auto max-w-5xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="shrink-0 flex text-black">
                                        <h1 className='pt-3 pl-3'>Edit User</h1>
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className='flex flex-col justify-center'>
                                    <form onSubmit={handleSubmit}
                                        className='shadow-black w-fuautoll   mx-auto bg-white p-8 px-8 rounded-3xl'

                                    >

                                        <br />
                                        <span className='flex font-bold justify-center text-red-500'>{message}</span>

                                        <div className='flex flex-col text-grey-500 py-2'>
                                            <div className='flex gap-3'>
                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2  focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Name'
                                                    type="text"
                                                    name="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                />
                                                <br />

                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2  focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder="Email"
                                                    type="email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
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
                                                />
                                                {/* <span className='flex flex-col'>{error && formValues.address1.length <= 0 ?
                                                    <label style={{ color: "red" }} >Address 1 cannot be empty </label> : ""}</span> */}
                                                <br />


                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Address 2'
                                                    type="text"
                                                    name='address2'
                                                    value={formValues.address2}
                                                    onChange={handleChange}
                                                />
                                                {/* <span>{error && formValues.address2.length <= 0 ?
                                                    <label style={{ color: "red" }} >Address 2 cannot be empty </label> : ""}</span> */}
                                                <br />
                                            </div>
                                            <div className='flex gap-3'>
                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Land Mark'
                                                    type="text"
                                                    name='landmark'
                                                    value={formValues.landmark}
                                                    onChange={handleChange} />
                                                {/* <span>{error && formValues.landmark.length <= 0 ?
                                                    <label style={{ color: "red" }} >Landmark cannot be empty </label> : ""}</span> */}
                                                <br />


                                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Post Office'
                                                    type="text"
                                                    name='postoffice'
                                                    value={formValues.postoffice}
                                                    onChange={handleChange}
                                                />
                                                {/* <span>{error && formValues.postoffice.length <= 0 ?
                                                    <label style={{ color: "red" }} >Post Office cannot be empty </label> : ""}</span> */}
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
                                                {/* <span>{error && formValues.pincode.length <= 0 ?
                                                    <label style={{ color: "red" }} >Pincode cannot be empty </label> : ""}</span> */}
                                                <br />

                                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Gaurdian Name'
                                                    type="text"
                                                    name='gaurdianname'
                                                    value={formValues.gaurdianname}
                                                    onChange={handleChange}
                                                />
                                                {/* <span>{error && formValues.gaurdianname.length <= 0 ?
                                                    <label style={{ color: "red" }} >Gaurdian Name cannot be empty </label> : ""}</span> */}
                                                <br />

                                            </div>
                                            <div className='flex gap-3'>
                                                <select name='value' onChange={handleChange} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                                    <option >
                                                        select a value
                                                    </option>
                                                    {options.map((data, i) => (

                                                        <option key={i} value={data.value}>
                                                            {data.label}
                                                        </option>
                                                    ))}

                                                </select>
                                                {/* <span>{error && formValues.value.length <= 0 ? 
                                                    <label style={{ color: "red" }} >select any</label> : ""}</span><br />*/}
                                            </div>
                                        </div>


                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">

                                    <button
                                        className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={close}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onSubmit={handleSubmit} type="submit"
                                    //   onClick={submit}
                                    >
                                        <FaTelegramPlane />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    )
}

export default UserEdit
