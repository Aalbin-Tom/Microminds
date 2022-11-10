import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaTelegramPlane } from 'react-icons/fa'

function UserEdit() {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [value, setValue] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [landmark, setLandmark] = useState('')
    const [postoffice, setPostoffice] = useState('')
    const [pincode, setPincode] = useState('')
    const [gaurdianname, setGaurdianname] = useState('')
    const [error, setError] = useState('')
    const [message, setMessages] = useState('')


    const options = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'premium', label: 'Premium' },
    ]


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log("hiiiiiiiiii");
    //     try {
    //         await axios.post(`/admin/edit-user`, { email, name, address1, address2, postoffice, pincode, gaurdianname, landmark, value })
    //         // setFormValues(initialValues)
    //     } catch (error) {
    //         setMessages(error.response.data.message)
    //         console.log(error);
    //     }
    // }





    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (name.length === 0 || email.length === 0 || landmark.length === 0 || pincode.length === 0 || value.length === 0 || address1.length === 0 || address2.length === 0) {
            setError("true")
        }

        console.log('hai');
        if (name.length !== 0 && email.length !== 0 && gaurdianname.length !== 0 && landmark.length !== 0 && pincode.length !== 0 && address1.length !== 0 && value.length !== 0 && address2.length !== 0) {
            try {
                alert(id)
                await axios.post(`/admin/edit-user`, { name, address1, address2, postoffice, pincode, gaurdianname, landmark, value, id })
            } catch (error) {
                alert(id)
                setMessages(error.response.data.message)
                console.log(error);
            }
        }
    }


    const userdata = async () => {
        const user = await axios.get(`/admin/single-user/${id}`)
        setName(user.data.users[0].name)
        setEmail(user.data.users[0].email)
        setValue(user.data.users[0].value)
        setAddress1(user.data.users[0].users[0].address1)
        setAddress2(user.data.users[0].users[0].address2)
        setLandmark(user.data.users[0].users[0].landmark)
        setPincode(user.data.users[0].users[0].pincode)
        setPostoffice(user.data.users[0].users[0].postoffice)
        setGaurdianname(user.data.users[0].users[0].gaurdianname)

    }


    useEffect(() => {
        userdata()
    }, [])

    return (


        <div>
            <>
                <div
                    className="bg-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-[40rem] my-6 mx-auto max-w-5xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h1 className="shrink-0 flex text-black">
                                    <span className=' text-2xl flex justify-center font-extrabold text-emerald-500'>Edit User</span>
                                </h1>

                            </div>
                            {/*body*/}
                            <div className='flex flex-col justify-evenly items-center'>
                                <form onSubmit={handleSubmit}
                                    className='shadow-black w-full flex justify-around mx-auto bg-white p-8 px-8 rounded-3xl'>


                                    <br />
                                    <span className='flex font-bold justify-center text-red-500'>{message}</span>

                                    <div className='flex flex-col justify-between text-grey-500 py-2'>
                                        <div className='flex gap-3'>
                                            <div>
                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2  focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    value={name}
                                                    placeholder="Name"
                                                    type="text"
                                                    name="name"
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <span className='flex flex-col'>{error && name.length <= 0 ?
                                                    <label style={{ color: "red" }} >Name cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />
                                            <div>
                                                <select name='value' onChange={(e) => setValue(e.target.value)} className='rounded-full bg-blue-200 mt-2 p-2  focus:outline-green-400 required:selection:'>
                                                    <option >
                                                        select a value
                                                    </option>
                                                    {options.map((data, i) => (

                                                        <option key={i} value={data.value}>
                                                            {data.label}
                                                        </option>
                                                    ))}

                                                </select>
                                                <span>{error && value.length <= 0 ?
                                                    <label style={{ color: "red" }} >select any</label> : ""}</span><br />

                                            </div>
                                            <br />
                                        </div>
                                        <div className='flex gap-3'>
                                            <div>
                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Address 1'
                                                    type="text"
                                                    name='address1'
                                                    value={address1}
                                                    onChange={(e) => setAddress1(e.target.value)}

                                                />
                                                <span className='flex flex-col'>{error && address1.length <= 0 ?
                                                    <label style={{ color: "red" }} >Address 1 cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />
                                            <div>

                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Address 2'
                                                    type="text"
                                                    name='address2'
                                                    value={address2}
                                                    onChange={(e) => setAddress2(e.target.value)}

                                                /><br />
                                                <span>{error && address2.length <= 0 ?
                                                    <label style={{ color: "red" }} >Address 2 cannot be empty </label> : ""}</span>


                                            </div>

                                            <br />
                                        </div>
                                        <div className='flex gap-3'>
                                            <div>
                                                <input className=' rounded-sm bg-blue-200 mt-2 p-2 focus:border-blue-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Land Mark'
                                                    type="text"
                                                    name='landmark'
                                                    value={landmark}
                                                    onChange={(e) => setLandmark(e.target.value)}
                                                /><br />
                                                <span>{error && landmark.length <= 0 ?
                                                    <label style={{ color: "red" }} >Landmark cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />

                                            <div>
                                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Post Office'
                                                    type="text"
                                                    name='postoffice'
                                                    value={postoffice}
                                                    onChange={(e) => setPostoffice(e.target.value)}

                                                /><br />
                                                <span>{error && postoffice.length <= 0 ?
                                                    <label style={{ color: "red" }} >Post Office cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />
                                        </div>
                                        <div className='flex gap-3'>
                                            <div>
                                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Pin Code'
                                                    type="number"
                                                    name='pincode'
                                                    value={pincode}
                                                    onChange={(e) => setPincode(e.target.value)}

                                                /><br />
                                                <span>{error && pincode.length <= 0 ?
                                                    <label style={{ color: "red" }} >Pincode cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />
                                            <div>
                                                <input className='rounded-sm bg-blue-200 mt-2 p-2 focus:border-red-500 focus:bg-grey-800 focus:outline-green-400'
                                                    placeholder='Gaurdian Name'
                                                    type="text"
                                                    name='gaurdianname'
                                                    value={gaurdianname}
                                                    onChange={(e) => setGaurdianname(e.target.value)}

                                                /><br />
                                                <span>{error && gaurdianname.length <= 0 ?
                                                    <label style={{ color: "red" }} >Gaurdian Name cannot be empty </label> : ""}</span>
                                            </div>
                                            <br />

                                        </div>
                                        <div className='flex gap-3'>
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    //   onClick={submit}
                                    >
                                        <FaTelegramPlane />
                                    </button>

                                </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            {/* ) : null} */}

        </div>
    )
}

export default UserEdit
