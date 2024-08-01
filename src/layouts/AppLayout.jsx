import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
export default function AppLayout() {
  return (
    <div>
        <main className="min-h-screen container">
            <Header></Header>
            <Outlet></Outlet>
        </main>

        <div className="p-10 text-center bg-gray-800 mt-10">
          Made with Love ❤️ by Md Samsad Alam
        </div>

        {/* footer */}
    </div>
  )
}
