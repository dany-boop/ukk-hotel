import React from 'react'
import Head from 'next/head'

import Navbar from '../../Common/Navbar/Navbar'
import TopSection from './components/TopSection'

function ContainerHome() {
    return (
        <>
            <Head>
                <title>Hotel</title>
            </Head>

            <Navbar />

            <main className='pt-20'>
                <TopSection />
            </main>
        </>
    )
}

export default ContainerHome