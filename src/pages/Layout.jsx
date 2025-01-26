import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

const Layout = () => {
  return (
    <div>
      <Navigation/>
      <Outlet/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Layout
