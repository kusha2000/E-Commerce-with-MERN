import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayLKRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticleCard = ({loading,data=[]}) => {
    const loadingList=new Array(13).fill(null)
    const {fetchUserAddToCart}=useContext(Context)

    const handleAddToCart=async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

        {
            loading ? (
                loadingList.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[280px]md:min-w-[350px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                <img src='' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                            </div>
                            <div className='p-2 grid gap-3 '>
                                <h2 className='font-medium md:text-lg text-base text-ellipsis py-2 line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full py-2 bg-slate-200'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className=' text-white py-2 rounded-full text-sm p-1 animate-pulse bg-slate-200 '></button>
                            </div>
                        </div>
                    )
                })
            )
            :
            (
                data.map((product,index)=>{
                    return(
                        <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                            </div>
                            <div className='p-2 grid gap-3'>
                                <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500 '>{product.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 '>{displayLKRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayLKRCurrency(product?.price)}</p>
                                </div>
                                <button className='bg-red-600 hover:bg-red-700 px-3 text-white py-0.5 rounded-full text-sm' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            )
            
        }
    </div>
  )
}

export default VerticleCard