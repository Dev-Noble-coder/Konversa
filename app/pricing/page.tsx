import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PricingPage from '../components/PricingPage'

const page = () => {
  return (
    <>
    <NavBar />
    <PricingPage isDark={true} />
    <Footer />
    
    </>
  )
}

export default page