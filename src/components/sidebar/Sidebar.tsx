// src/components/sidebar/Sidebar.tsx
"use client";

import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft, MoreVertical, Plus, Search, LogIn, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/authStore";
import { useUserAuth } from "@/hooks/useUserAuth";

const recentItems = ["Summarize lesson notes", "Explain thermodynamics simply", "Build exam revision roadmap"];
const favoriteItems = ["PhD writing assistant", "Classroom lesson simplifier", "Research framework builder", "Exam prep content generator", "Teaching note summarizer"];

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const isUserAuthenticated = useUserStore((state) => !!state.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated);

  // Sync token presence
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const initialize = useAuthStore((state) => state.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);

  const { isLoading } = useUserAuth();

  return (
   <aside
    className={`
      fixed inset-y-0 left-0 z-50 w-64 -translate-x-full transition-transform duration-300 ease-in-out bg-[#161d27] border-r border-white/10 flex flex-col h-screen
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      
      md:sticky md:top-0 md:translate-x-0 
      ${isCollapsed ? "md:w-16" : "md:w-64"}
    `}
  >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4">
        {/* Show items if sidebar is open on mobile OR expanded on desktop */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex items-center gap-3 flex-1 mr-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-[#0f172a]">
              <Plus className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1d2633] px-3 py-2 text-sm text-slate-300 w-full min-w-0">
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Contents...</span>
            </div>
          </div>
        )}
        
        {/* Toggle / Close Control Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleCollapse}
          className={`text-slate-300 hover:bg-white/5 hover:text-white ${isCollapsed && !isMobileOpen ? "mx-auto" : ""}`}
        >
          {/* Mobile Display: Clicking icon acts as a close window event */}
          <span className="md:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="h-5 w-5" />
          </span>
          
          {/* Desktop Display: Standard collapsing arrow triggers */}
          <span className="hidden md:block">
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </span>
        </Button>
      </div>

      {/* Main Content Area */}
     {/* Bottom Footer: About + Auth buttons */}
      {(!isCollapsed || isMobileOpen) && (
        <div className="mt-auto px-4 py-4 border-t border-white/10 flex flex-col gap-2">
          <Link href="/about" className="w-full">
            <Button
              variant="outline"
              className="w-full rounded-xl border-white/15 bg-[#1b2432] text-slate-100 hover:bg-[#243041] hover:text-white"
            >
              About Us
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button
              className="w-full rounded-xl bg-primary text-foreground hover:bg-[#243041] hover:text-white font-medium"
              onClick={() => {
                // reuse your logout logic here
                localStorage.removeItem("token");
                window.location.href = "/signup";
              }}
            >
              Log Out
            </Button>
          ) : (
            <Link href="/signup" className="w-full">
              <Button className="w-full rounded-xl bg-primary text-foreground hover:bg-[#243041] hover:text-white font-medium gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Collapsed icons (desktop only) */}
      {isCollapsed && (
        <div className="mt-auto mb-4 hidden md:flex flex-col items-center gap-3">
          <Link href="/about">
            <Button size="icon" variant="ghost" className="text-slate-300 hover:bg-white/5">
              {/* Info icon for About */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link href="/signup">
              <Button size="icon" variant="ghost" className="text-cyan-400 hover:bg-white/5">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </aside>

    //   {/* Collapsed Sign In Icon (Desktop mode helper) */}
    //   {isCollapsed && !isAuthenticated && (
    //     <div className="mt-auto mb-4 hidden md:flex justify-center">
    //       <Link href="/signup">
    //         <Button size="icon" variant="ghost" className="text-cyan-400 hover:bg-white/5">
    //           <LogIn className="h-5 w-5" />
    //         </Button>
    //       </Link>
    //     </div>
    //   )}
    // </aside>
  );
}