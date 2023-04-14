import React from 'react'

import Skeleton from './skeleton'
import BookingItem from './Bookingitem'
import axios from '@/lib/axios'
import { headerConfig } from '@/lib/headerConfig'


const BookingSection = ({ user, dataBooking }) => {
    return (
        <section>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden">
            {!dataBooking?.length ? (
              <Skeleton />
            ) : user.role === 'admin' || user.role === 'resepsionis' ? (
              dataBooking?.map((a, i) => (
                <BookingItem
                  id_pemesanan={a.id_pemesanan}
                  nomor_pemesanan={a.nomor_pemesanan}
                  nama_tamu={a.nama_tamu}
                  nama_tipe_kamar={a.tipe_kamar.nama_tipe_kamar}
                  tgl_check_in={a.tgl_check_in}
                  tgl_check_out={a.tgl_check_out}
                  tgl_pemesanan={a.tgl_pemesanan}
                  jumlah_kamar={a.jumlah_kamar}
                  status_pemesanan={a.status_pemesanan}
                  user={user}
                  key={i}
                />
              ))
            ) : (
              dataBookByUser?.map((a, i) => (
                <BookingItem
                  id_pemesanan={a.id_pemesanan}
                  nomor_pemesanan={a.nomor_pemesanan}
                  nama_tamu={a.nama_tamu}
                  nama_tipe_kamar={a.tipe_kamar.nama_tipe_kamar}
                  tgl_check_in={a.tgl_check_in}
                  tgl_check_out={a.tgl_check_out}
                  tgl_pemesanan={a.tgl_pemesanan}
                  jumlah_kamar={a.jumlah_kamar}
                  status_pemesanan={a.status_pemesanan}
                  user={user}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
      </section>
    )
}

export default BookingSection