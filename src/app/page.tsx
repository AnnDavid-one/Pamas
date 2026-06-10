// page.tsx
"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import Dashboard from "../components/dashboard/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Home() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
<div className="min-h-screen bg-[#111827] text-white flex flex-col max-w-screen">
  <div className="flex flex-1 relative items-stretch bg-[#111827]">
    
    <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        
        {/* Backdrop overlay that closes mobile sidebar when clicking outside of it */}
        {isMobileOpen && (
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          />
        )}
        
        <div className="flex-1 flex flex-col min-w-0 min-h-screen ">
          {/* Pass setter to header so its hamburger icon can open the menu */}
          <Header onMenuClick={() => setIsMobileOpen(true)} />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Dashboard />
          </main>
          
          <ToastContainer position="top-right" autoClose={5000} theme="dark" /> 
        </div>
      </div>
    </div>
  );
}