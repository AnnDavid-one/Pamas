"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sparkles, Search, Star, StarIcon, Stars, StarHalf } from "lucide-react";
import ModelDropdown from "./ModelDropdown";
import { useSummarizerStore } from "@/store/useSummarizerStore";
import Image from "next/image";
import PamasLogo from "../../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/authStore";
import {  useState } from "react";


export default function HeaderAbout() {
  const { mode } = useSummarizerStore();
const pathname = usePathname();



 const { user } = useUserStore();
  const { token } = useAuthStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(() => {
    if (user && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log("user is logged in", isLoggedIn);
  }, [user, token]);




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

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
        >
          <Star color="#EAB308" /> Go Premium
        </Button>
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
          >
            Home
          </Button>
        </Link>


        {/* signup and out button */}
        {!isLoggedIn ? (
        <Link href={`/signup?returnTo=${encodeURIComponent(pathname)}`} >
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white"
          >
            Login
          </Button>
        </Link>

        ):( ""

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



