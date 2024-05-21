import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct]=useState([])
    const [loading,setLoading]=useState(false)

    const categoryLoading=new Array(13).fill(null)

    const fetchCategoryProduct=async()=>{
        setLoading(true)
        const responce=await fetch(summaryApi.categoryProduct.url)
        const dataResponce=await responce.json()
        setLoading(false)
        setCategoryProduct(dataResponce.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4 overflow-scroll scrollbar-none'>
        
        <div className="flex items-center gap-2 justify-between">
        {
            loading ? (
                
                    categoryLoading.map((el,index)=>{
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"CategoryLoading"+index}>

                            </div>
                        )
                    })
                
                
            ):
            (
                categoryProduct.map((product,index)=>{
                    return(
                        <Link to={"/product-category/"+product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                })
            )
        }
        </div>
        
        </div>
  )
}

export default CategoryList