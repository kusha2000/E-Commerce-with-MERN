import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    const [allUser,setAllUsers]=useState([])
    const [openUpdateRole,setopenUpdateRole]=useState(false)
    const [UpdateUserDetails,setUpdateUserDetails]=useState({
        email:"",
        name:"",
        userId:"",
        role:""
    })

    const fetchAllUsers = async()=>{
        const fetchData = await fetch(summaryApi.allUser.url,{
            method:summaryApi.allUser.method,
            credentials:'include'
        })

        const dataResponce =await fetchData.json()

        if(dataResponce.success){
            setAllUsers(dataResponce.data)
        }
        if(dataResponce.error){
            toast.error(dataResponce.message)
        }

        console.log(dataResponce)
    }

    useEffect(()=>{
        fetchAllUsers()
    },[])


  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className="bg-black text-white">
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('ll')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setopenUpdateRole(true)
                                    }} >
                                    <MdModeEdit /></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
                {
                    openUpdateRole && (<ChangeUserRole 
                        onClose={()=>setopenUpdateRole(false)}
                        name={UpdateUserDetails.name}
                        email={UpdateUserDetails.email}
                        role={UpdateUserDetails.role}
                        userId={UpdateUserDetails._id}
                        callFun={fetchAllUsers}
                        />)
                }
        
    </div>
  )
}

export default AllUsers