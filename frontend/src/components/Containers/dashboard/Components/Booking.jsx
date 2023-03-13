import React from 'react'
import BookingItem from './Bookingitem'

import Skeleton from './skeleton'

const BookingSection = ({ dataBooking }) => {
    return (
        <section>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full rounded-lg overflow-hidden">
                    {!dataBooking ? (
                        <Skeleton />
                    ) : (
                        dataBooking.map((a, i) => (
                            <BookingItem
                                id_pemesanan={a.id_pemesanan}
                                nomor_pemesan={a.nomor_pemesan}
                                nama_pemesan={a.nama_pemesan}
                                email_pemesan={a.email_pemesan}
                                nama_tamu={a.nama_tamu}
                                nama_tipe_kamar={a.tipe_kamar.nama_tipe_kamar}
                                tgl_check_in={a.tgl_check_in}
                                tgl_check_out={a.tgl_check_out}
                                tgl_pemesanan={a.tgl_pemesanan}
                                jumlah_kamar={a.jumlah_kamar}
                                status_pemesanan={a.status_pemesanan}
                                key={i}
                            />
                        ))
                    )}
                </div>
            </div>
        </section >
    )
}

export default BookingSection