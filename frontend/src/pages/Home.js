import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticleCardProduct from '../components/VerticleCardProduct'

const Home = () => {
  return (
    <div>
        <CategoryList/>
        <BannerProduct/>
        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airepods"}/>
        <HorizontalCardProduct category={"mouse"} heading={"Popular's Mouse"}/>

        <VerticleCardProduct category={"mobiles"} heading={"Mobiles"}/>
        <VerticleCardProduct category={"watches"} heading={"Watches"}/>
        <VerticleCardProduct category={"televisions"} heading={"Televisions"}/>
        <VerticleCardProduct category={"camera"} heading={"Camera & Photograph"}/>
        <VerticleCardProduct category={"earphones"} heading={"Wired Earphones"}/>
        <VerticleCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
        <VerticleCardProduct category={"refrigerator"} heading={"Rrefrigerator"}/>
        <VerticleCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home