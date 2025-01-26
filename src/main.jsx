import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import Menus from './pages/Menus.jsx'
import AddMenuItem from './pages/AddMenuItem.jsx'
import { MenusProvider } from './context/Items.jsx'
import { RatingsProvider } from './context/Ratings.jsx'
import Discussion from './pages/Anaylatics.jsx'
import About from './pages/About.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <RatingsProvider>
    <MenusProvider>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='discussions' element={<Discussion />} />
              <Route path='gallery' element={<Gallery />} />
              <Route path='explore' element={<Menus />} />
              <Route path='/:path/addItem' element={<AddMenuItem />} />
              <Route path='about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </MenusProvider>
  </RatingsProvider>
)
