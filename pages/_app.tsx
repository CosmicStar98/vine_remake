import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '../styles/globals.css';
import '../styles/vine.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
	<div id="outer-wrapper" className="index logged-out">
      <div id='main-content'>
        <Navbar />
        <section id='explore-content'>
          <section id='explore-sidebar'>
            <Sidebar />
          </section>
          <section id='explore-timeline'>
            <Component {...pageProps} />
          </section>
        </section>
      </div>
	</div>
	<Footer />
    </GoogleOAuthProvider>
  );
};

export default MyApp;