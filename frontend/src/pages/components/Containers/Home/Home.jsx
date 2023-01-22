import React from 'react'
import Head from 'next/head'

import Navbar from '../../Common/Navbar/Navbar'
import Footer from '../../Common/Footer'
import TopSection from './components/TopSection'
import AboutSection from './components/About'


function ContainerHome() {
    return (
        <>
            <Head>
                <title>Hotel</title>
            </Head>

            <Navbar />

            <main className='pt-20'>
                <TopSection />
                <AboutSection />
            </main>

            <Footer />
        </>
    )
}

export default ContainerHome