import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/producCategory'
import VerticleCard from '../components/VerticleCard'
import summaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const location=useLocation()
    const urlSearch=new URLSearchParams(location.search)
    const urlCategoryListinArray=urlSearch.getAll("category")

    const urlCategoryListObject={}
    urlCategoryListinArray.forEach(el=>{
      urlCategoryListObject[el]=true
    })

    //console.log("urlCategoryListObject",urlCategoryListObject);
    //console.log("urlCategoryListinArray",urlCategoryListinArray);
    
    const[selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const [filterCategoryList,setfilterCategoryList]=useState([])


    const [sortBy,setSortBy]=useState("")

    const fetchData=async()=>{
        const response=await fetch(summaryApi.filterProduct.url,{
        method:summaryApi.filterProduct.method,
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify({
            category:filterCategoryList
        })
      })

      const dataResponse=await response.json()

      setData(dataResponse?.data || [])
      console.log("Data Response :sort",dataResponse)
    }

    const handleSelectCategory=(e)=>{
      const {name,value,checked}=e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value]:checked
        }
      })

       
    }

    //console.log("selected category:",selectCategory);
      //console.log("selected category:",value,checked);

      useEffect(()=>{
        fetchData()
      },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }

        return null
      }).filter(el=>el)

      setfilterCategoryList(arrayOfCategory)

      // Format for url change when change on the checkbox
      const urlFormat=arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }

        return `category=${el}&&`

      })
      navigate("/product-category?"+urlFormat.join(""))
      //console.log("Selected c",arrayOfCategory)
    },[selectCategory])

    const handleOnChangeSortBy=(e)=>{
      const {value}=e.target

      setSortBy(value)

      if(value==="asc"){
        setData(pre=>pre.sort((a,b)=>a.sellingPrice-b.sellingPrice))
      }
      if(value==="dsc"){
        setData(pre=>pre.sort((a,b)=>b.sellingPrice-a.sellingPrice))
      }

    }

    useEffect(()=>{

    },[sortBy])

    
  return (
    <div className='container mx-auto p-4'>

        {/* Desktop Version */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
            {/* Left Side */}
            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
              
              {/* sort by */}
              <div className=' '>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                <form className='text-sm flex flex-col gap-2 py-2'>
                  <div className='flex items-center gap-3'>
                    <input type='radio' checked={sortBy==='asc'} name='sortBy' value={"asc"} onChange={handleOnChangeSortBy}/>
                    <label>Price - Low to High</label>
                  </div>

                  <div className='flex items-center gap-3'>
                    <input type='radio' checked={sortBy==='dsc'} name='sortBy' value={"dsc"} onChange={handleOnChangeSortBy}/>
                    <label>Price - High to Low</label>
                  </div>
                </form>

              </div>

              {/* filter by */}
              <div className=' '>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                <form className='text-sm flex flex-col gap-2 py-2'>
                  {
                    productCategory.map((categoryName,index)=>{
                      return(
                        <div className='flex items-center gap-3'>
                          <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                          <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                        </div>
                      )
                    })
                  }
                </form>

              </div>


            </div>
            {/* Right Side (product) */}
            <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Serach Results : {data.length}</p>
              <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !==0 && (
                  <VerticleCard data={data} loading={loading}/>
                )
                
              }
              </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryProduct