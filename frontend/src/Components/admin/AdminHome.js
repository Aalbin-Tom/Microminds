import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineDangerous, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
    const [user, setUsers] = useState([])
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
    const [state, setState] = useState(false)

    const navigate = useNavigate();
    const users = async () => {
        const user = await axios.get(`/admin/get-users`)
        setUsers(user.data.users)
    }

    useEffect(() => {
        users()
    }, [reducerValue])



    const deleteuser = (_id, name) => {
        try {

            Swal.fire({
                title: `Do you Want to Delete ${name}?`,
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post("/admin/delete-user", { _id });
                    forceUpdate()
                }
            });
        } catch (error) { }
    }
    const BlockUser = (_id) => {
        try {

            Swal.fire({
                title: "Do you Want to block?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.post(`/admin/blockUser`, { _id: _id });

                    setState(state ? false : true);
                    console.log(state);
                    forceUpdate()
                }
            });
        } catch (error) { }
    };

    const UnBlockUser = (_id) => {

        try {

            Swal.fire({
                title: "Do you Want to Unblock this user?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.post(`/admin/unblockUser`, { _id: _id });
                    console.log(data);
                    // setState(state ? false : true);
                    // console.log(state);
                    forceUpdate()
                }
            });
        } catch (error) { }
    };

    const edituser = (_id) => {
        navigate(`/admin/single-user/${_id}`)
    }

    const logout = () => {
        localStorage.removeItem("loginInfo")
        navigate(`/login`)
    }


    return (
        <div className='h-screen'>
            <div className='pb-8 font-bold'>
                <h1 >USER DETAILS</h1>
                <button onClick={logout} className=' w-sm  px-12 py-2.5 bg-green-600 text-white  leading-tight text-xl font-bold rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out  shadow-green-600/50 '>
                    Logout
                </button>
            </div>
            <div className="flex flex-col h-auto">
                <div className="overflow-x-auto sm:-mx-6 lg:mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b text-2xl ">
                                    <tr>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Sl.No
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>

                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Account Status
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Privilage
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Status
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Delete
                                        </th>
                                        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                            Manage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((data, index) => (
                                        <tr key={index} className="border-b text-semibold">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                {data.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                {data.email}
                                            </td>

                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                <span className='rounded px-1 bg-gray-400'> {data.users.length == 0 ? " Not completed" : "completed "}</span>
                                            </td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                {data.value.toUpperCase()}
                                            </td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                {data.status ? <a
                                                    className="text-red-500  hover:text-red-700 cursor-pointer"
                                                    onClick={() => {
                                                        BlockUser(data._id);
                                                        setState(false);
                                                    }}
                                                >
                                                    Block
                                                </a>
                                                    :
                                                    <a
                                                        className="text-red-500 hover:text-red-700 cursor-pointer"
                                                        onClick={() => {
                                                            UnBlockUser(data._id);
                                                            setState(true);
                                                        }}
                                                    >
                                                        Unblock
                                                    </a>
                                                }
                                            </td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                <a onClick={() => deleteuser(data._id, data.name)} ><MdDelete size={30} /></a>
                                            </td>
                                            <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                                {data.users.length == 0 ? <MdOutlineDangerous size={30} /> : <FaUserEdit size={30} onClick={() => edituser(data._id)} />}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome

