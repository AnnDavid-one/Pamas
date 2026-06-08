//page.tsx
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import Dashboard from "../components/dashboard/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // You need to import this CSS file

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111827]">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <Dashboard />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" /> {/* Add the ToastContainer for notifications */} 
        </div>
      </div>
    </div>
  );
}