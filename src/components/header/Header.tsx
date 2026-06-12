"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sparkles, Star, Menu } from "lucide-react"; // Added Menu icon
import ModelDropdown from "./ModelDropdown";
import { useSummarizerStore } from "@/store/useSummarizerStore";
import Image from "next/image";
import PamasLogo from "../../assets/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  onMenuClick?: () => void; // Added type safe optional property for layout integration
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { mode } = useSummarizerStore();
  const pathname = usePathname();
  const { logout, user } = useUserStore(); // Destructured user data to render dynamic avatars
  const { logout: authLogout } = useAuthStore();
  const isUserAuthenticated = useUserStore((state) => !!state.user);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    authLogout();
    localStorage.removeItem("token");
    router.push("/signup");
  };

  useEffect(() => {
    console.log("Is Authenticated:", isUserAuthenticated);
  }, [isUserAuthenticated]);

  return (
    <header className="flex items-center justify-between px-3 py-5 bg-gradient-to-r from-foreground from-40% to-[#0D4559] to-90% border-b border-white/5">
      {/* Left items control group */}
      <div className="flex items-center gap-2">
        {/* Mobile Hamburger Trigger: Visible only on mobile, links to layout state */}
        <button
          onClick={onMenuClick}
          className="text-slate-300 hover:text-white block md:hidden p-1.5 rounded-xl hover:bg-white/5 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        <ModelDropdown />
      </div>

      {/* Right navigation utilities group */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Hide Premium & About on small mobile layouts to save horizontal whitespace */}
        <Button
          variant="outline"
          className="flex md:hidden rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white items-center "
        >
          <Star className="h-4 w-4" color="#EAB308" fill="#EAB308" /> Pro
        </Button>
        <Button
          variant="outline"
          className="hidden md:flex rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white items-center gap-2"
        >
          <Star className="h-4 w-4" color="#EAB308" fill="#EAB308" />
          Go Premium
        </Button>

        <Link href="/about" passHref className="hidden sm:inline-block">
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
          >
            About Us
          </Button>
        </Link>

        {isUserAuthenticated ? (
          <Button
            variant="outline"
            className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white font-medium"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        ) : (
          <Link href={`/signup?returnTo=${encodeURIComponent(pathname)}`}>
            <Button
              variant="outline"
              className="rounded-xl border-white/15 bg-primary text-foreground hover:bg-[#243041] hover:text-white font-medium"
            >
              Login
            </Button>
          </Link>
        )}

        {/* Dynamic User Avatar */}
        <Avatar className="h-10 w-10 border border-white/10">
          {user?.picture ? (
            <AvatarImage src={user.picture} alt={user.name || "User profile"} />
          ) : (
            <AvatarImage src="/avatar.png" alt="Fallback avatar" />
          )}
          <AvatarFallback className="bg-cyan-500/20 text-cyan-300 font-bold">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "AI"}
          </AvatarFallback>
        </Avatar>

        {/* <Button
          size="icon"
          variant="ghost"
          className="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </Button> */}
      </div>
    </header>
  );
}
