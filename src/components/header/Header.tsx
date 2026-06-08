"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sparkles, Search, Star, StarIcon, Stars, StarHalf } from "lucide-react";
import ModelDropdown from "./ModelDropdown";
import { useSummarizerStore } from "@/store/useSummarizerStore";
import Image from "next/image";
import PamasLogo from "../../assets/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const { mode } = useSummarizerStore();
const pathname = usePathname();
const {logout}=useUserStore();
const{logout: authLogout}=useAuthStore();
const isUserAuthenticated = useUserStore((state) => !!state.user);
const router = useRouter(); // 2. Initialize the router



const handleLogout = () => {
  logout(); // Clear user data from Zustand store
  authLogout(); // Clear authentication data from Zustand store
  localStorage.removeItem("token"); // Clear token from localStorage
  // window.location.href = "/signup"; // Redirect to home or login page
  // note: this freezes the state use router for better performance
  router.push("/signup");

}

useEffect(() => {
  console.log(isUserAuthenticated)
},[])


// const { user, fetchUserData } = useUserStore();

//   useEffect(() => {
//     if (!user) {
//       fetchUserData(); // Fetch user data when the app loads if not already in the store
//     }
//   }, [user, fetchUserData]);

  // if (!user) {
  //   return <div className="min-h-[20vh text-xl">Loading user data...</div>; // Show a loading indicator while fetching user data
  // }

  return (
    <header  className="flex items-center justify-between px-5 py-5 bg-gradient-to-r from-foreground from-40% to-[#0D4559] to-90%">
      <ModelDropdown />

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
        >
          <Star color="#EAB308" /> Go Premium
        </Button>
        <Link href="/about" passHref>
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
          >
            About Us
          </Button>
        </Link>
        {
          isUserAuthenticated ? (
        
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white"
            onClick={handleLogout}
          >
            Log Out
          </Button>

          ):(

                <Link href={`/signup?returnTo=${encodeURIComponent(pathname)}`} >
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white"
          >
            Login
          </Button>
        </Link>
          )
        }
        {/* <Link href="http://localhost:5000/auth/google" passHref>
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white"
          >
            Login
          </Button>
        </Link> */}
        <Avatar className="h-10 w-10">
          <Image src={PamasLogo} alt="User" className="rounded-xl" />
        </Avatar>
        <Button
          size="icon"
          variant="ghost"
          className="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

function AvatarWithFallback() {
  return (
    <header className="flex items-center justify-between px-5 py-5 bg-[#0f17233]">
      {/* Other header content */}
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
            AI
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function AvatarWithFallbackAndImage() {
  return (
    <header className="flex items-center justify-between px-5 py-5 bg-[#0f172a]">
      {/* Other header content */}
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
            AI
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function AvatarWithImageOnly() {
  return (
    <header className="flex items-center justify-between px-5 py-5 bg-[#0f172a]">
      {/* Other header content */}
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 border border-white/10">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback className="bg-cyan-500/20 text-cyan-300">
            AI
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
