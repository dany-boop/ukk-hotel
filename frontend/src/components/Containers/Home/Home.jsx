import React from 'react'
import Head from 'next/head'

import Navbar from '@/components/Common/Navbar/Navbar'
import Footer from '@/components/Common/Footer'
import TopSection from './components/TopSection'
import AboutSection from './components/About'
import Carousel from './components/Carousel'
import RecomendationSection from './components/Recommendation'
import FacilitiesSection from './components/Facilities'
import FAQ from './components/FAQ'
import CallToAction from './components/CallToAction'


function ContainerHome() {
    return (
        <>
            <Head>
                <title>Wikusama Hotel</title>
            </Head>

            <Navbar />

            <main className="pt-20">
                <TopSection />
                <RecomendationSection/>
                <AboutSection />
                <FacilitiesSection/>
                <FAQ/>
                <CallToAction/>
            </main>

            <Footer />
        </>
    )
}

export default ContainerHome