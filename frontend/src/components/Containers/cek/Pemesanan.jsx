import React, { useState } from 'react'

import axios from '@/lib/axios'

function ContainerCheckPemesanan() {
    const [data, setData] = useState({
        email_pemesan: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const sendData = { ...data }

        axios
            .get('/pemesanan/customer', sendData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <button onClick={(e) => handleSubmit(e)}>Cari</button>
        </div>
    )
}

export default ContainerCheckPemesanan