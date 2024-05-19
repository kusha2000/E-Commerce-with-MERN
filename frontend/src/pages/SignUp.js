import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';


const SignUp = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [showconfirmPassword,setShowConfirmPassword]=useState(false)
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:"",
    })

    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((pre)=>{
            return{
                ...pre,
                [name]:value
        }
        })
    }

    const handleUploadPic=async(e)=>{
        const file=e.target.files[0];
        const imagePic=await imageTobase64(file)
        //console.log("ImagePic",imagePic);
        setData((pre)=>{
            return{
                ...pre,
                profilePic:imagePic
        }
        })
    }

    console.log("data login" ,data)

    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <section id='signup'>
        <div className='mx-auto container px-4 mt-2'>
            <div className="bg-white p-4 w-full max-w-sm mx-auto">
                <div className='w-20 h-20 mx-auto relative  overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt="login icons"/>
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-1 text-center cursor-pointer absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}></input>
                        </label>
                        
                    </form>
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-200 p-2'>
                        <input type='text' placeholder="Enter name"  className='w-full h-full outline-none bg-transparent' name='name' value={data.name} onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-200 p-2'>
                        <input type='email' placeholder="Enter email"  className='w-full h-full outline-none bg-transparent' name='email' value={data.email} onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showPassword ? "" : "password"} placeholder="Enter password" className='w-full h-full outline-none bg-transparent' value={data.password} name='password' onChange={handleOnChange} required></input>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((pre)=>!pre)}>
                            <span>
                                {
                                    showPassword?(<FaEyeSlash />):(<FaEye />)
                                }
                                
                            </span>
                        </div>
                        </div>

                    </div>
                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showconfirmPassword ? "" : "password"} placeholder="Enter confirm password" className='w-full h-full outline-none bg-transparent' value={data.confirmPassword} name='confirmPassword' onChange={handleOnChange} required></input>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((pre)=>!pre)}>
                            <span>
                                {
                                    showconfirmPassword?(<FaEyeSlash />):(<FaEye />)
                                }
                                
                            </span>
                        </div>
                        </div>
                    </div>
                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

                </form>
                <p className='my-5'>Already have account? <Link to={"/login"} className='text-red-600 hover:text-red-800 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp