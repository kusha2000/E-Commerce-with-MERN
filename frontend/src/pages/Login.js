import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [data,setData]=useState({
        email:"",
        password:"",
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
    console.log("data login" ,data)

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

  return (
    <section id='login'>
        <div className='mx-auto container px-4 mt-2'>
            <div className="bg-white p-4 w-full max-w-sm mx-auto">
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt="login icons"/>
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-200 p-2'>
                        <input type='email' placeholder="Enter email"  className='w-full h-full outline-none bg-transparent' name='email' value={data.email} onChange={handleOnChange}></input>
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showPassword ? "" : "password"} placeholder="Enter password" className='w-full h-full outline-none bg-transparent' value={data.password} name='password' onChange={handleOnChange}></input>
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((pre)=>!pre)}>
                            <span>
                                {
                                    showPassword?(<FaEyeSlash />):(<FaEye />)
                                }
                                
                            </span>
                        </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>Forgot password</Link>
                    </div>
                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                </form>
                <p className='my-5'>Don't have account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-800 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login