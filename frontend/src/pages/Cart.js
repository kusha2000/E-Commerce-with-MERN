import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import displayLKRCurrency from '../helpers/displayCurrency'
import {MdDelete} from 'react-icons/md'

const Cart = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

    const [menuDisplay,setMenuDisplay]=useState(false)
    const context=useContext(Context)
    const loadigCart=new Array(context.cartProductCount).fill(null)

    const fetchData=async()=>{
        setLoading(true)
        const responce=await fetch(summaryApi.addToCartProductView.url,{
            method:summaryApi.addToCartProductView.method,
            credentials:'include',
            headers:{
                'content-type':"application/json"
            },
        })
        setLoading(false)

        const responseData=await responce.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const increaseQty=async (id,qty)=>{
        const response=await fetch(summaryApi.updateCartProduct.url,{
            method:summaryApi.addToCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                _id:id,
                quantity:qty+1
            })
        })

        const responseData=await response.json()

        if(responseData.success){
            fetchData()
        }
    }
    const decreaseQty=async (id,qty)=>{
        if(qty>=2){
            const response=await fetch(summaryApi.updateCartProduct.url,{
                method:summaryApi.updateCartProduct.method,
                credentials:'include',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    _id:id,
                    quantity:qty-1
                })
            })
    
            const responseData=await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct=async(id)=>{
        const response=await fetch(summaryApi.deleteCartProduct.url,{
            method:summaryApi.deleteCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                _id:id,
            })
        })

        const responseData=await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
    const totalPrice=data.reduce((previousValue,currentValue)=>previousValue+(currentValue.quantity * currentValue?.productId?.sellingPrice),0)

    //console.log("cart",data);

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>
            {/* View product */}
            <div className='w-full max-w-3xl'>
               {
                loading ?
                (   
                    loadigCart.map(el=>{
                        return(
                            <div key={el+"Add To Cart Loading"} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                        
                             </div>
                        )
                    })
                    
                )
                :
                (   
                    data.map((product,index)=>{
                        return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-40 sm:h-32 md:h-32 lg:h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/* Delete Product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                    <div className='flex flex-col items-center justify-between sm:flex-row md:flex-row lg:flex-row'>
                                        <p className='text-red-600 font-medium text-lg'>{displayLKRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayLKRCurrency(product?.productId?.sellingPrice * product.quantity)}</p>

                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white'  onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white'   onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>
                             </div>
                        )
                    })
                    
                )
               } 
            </div>

               {/* Summary */}

               <div className='mt-5 lg:mt-0 w-full max-w-sm '>
                {
                    loading ? 
                    (
                        <div className='h-36 my-2 bg-slate-200 border border-slate-300 animate-pulse'>
                            
                        </div>
                    )
                    :
                    (
                        <div className='h-36 my-2 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayLKRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 p-2 mt-1 text-white w-full'>Payment</button>

                        </div>
                    )
                }
               </div>

               

        </div>
    </div>
  )
}

export default Cart