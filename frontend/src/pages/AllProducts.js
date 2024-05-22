import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'


const AllProducts = () => {
    const [openUplaodProduct,setOpenUploadProduct]=useState(false)
    const [allProduct,setAllProduct]=useState([])

    const fetchAllProduct=async()=>{
        const response=await fetch(summaryApi.allProduct.url)
        const dataResponse=await response.json()

        setAllProduct(dataResponse?.data || [])
    }
    useEffect(()=>{
        fetchAllProduct()
    },[])

  return (
    <div>
        <div className="bg-white px-4 py-2 flex justify-between items-center">
            <h2 className="font-bold text-lg">App Product</h2>
            <button className='border-2  border-red-600  text-red-600 py-1 px-2 rounded-full hover:bg-red-600 hover:text-white transition-all ' onClick={()=>setOpenUploadProduct(true)}>Uplaod Product</button>
        </div>

        {/* Get All Product
        //we have to change 100vh-190px */}
        
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
            {
                allProduct.map((product,index)=>{
                    return(
                        <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
                        
                    )
                })
            }
        </div>

        
            {/* upload product component */}
            {
                openUplaodProduct && (
                    <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
                )
            }
        
    </div>
  )
}

export default AllProducts