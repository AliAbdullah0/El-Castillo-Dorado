import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const Layout = () => {
  return (
    <div>
      {/* Performance Insights - Vercel Speed Insights */}
      <SpeedInsights />
      
      {/* Analytics - Vercel Analytics */}
      <Analytics />
      
      <Navigation />
      <Outlet />
      <Banner />
      <Footer />
    </div>
  );
};

export default Layout;
