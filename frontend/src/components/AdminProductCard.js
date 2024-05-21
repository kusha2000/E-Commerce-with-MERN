import React, { useState } from 'react'
import {MdModeEditOutline} from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayLKRCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({
    data,
    fetchData
}) => {
    const [editProduct,setEditProduct]=useState(false)
    
  return (
    <div className='bg-white p-2 rounded '>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
                < img src={data?.productImage[0]} width={100} height={100} className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <div>
                    <p className='font-semibold'>
                        {
                            displayLKRCurrency(data.sellingPrice)
                        }
                    </p>
                 
                </div>
                <div className='w-fit ml-auto p-2 bg-green-200 rounded-full hover:bg-green-600 hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>
            </div>
            
            
        </div>

        {
            editProduct && (
                <AdminEditProduct onClose={()=>setEditProduct(false)} productData={data} fetchData={fetchData}/>
            )
        }
    </div>
  )
}

export default AdminProductCard