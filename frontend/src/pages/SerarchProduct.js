import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../common';
import VerticleCard from '../components/VerticleCard';

const SerarchProduct = () => {
    const query=useLocation()
    //console.log("query",query.search);
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)

    const fetchProduct=async()=>{
        setLoading(true)
        const reponse=await fetch(summaryApi.serachProduct.url+query.search)
        const dataResponse=await reponse.json()
        setLoading(false)
        //console.log("data response search:",dataResponse)

        setData(dataResponse.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4 '>
        {
            loading &&
            (
                <p className='text-lg text-center'>Loading ...</p>
            )
     
        }
        
        <p className='text-lg font-semibold my-3'>Search Results:{data.length}</p>
        
        {
            data.length===0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
            )
        }

        {
            data.length !==0 && !loading && (
                <VerticleCard loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SerarchProduct