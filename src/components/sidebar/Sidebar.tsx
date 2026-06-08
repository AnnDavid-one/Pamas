"use client";

import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft, MoreVertical, Plus, Search, LogIn } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/authStore";
import { useUserAuth } from "@/hooks/useUserAuth";

const recentItems = ["Summarize lesson notes", "Explain thermodynamics simply", "Build exam revision roadmap"];
const favoriteItems = ["PhD writing assistant", "Classroom lesson simplifier", "Research framework builder", "Exam prep content generator", "Teaching note summarizer"];

export default function Sidebar() {
  
    // check if user is authenticated on component mount and update state accordingly
  const isUserAuthenticated = useUserStore((state) => !!state.user);
  // const = useAuthStore((state) => !!localStorage.getItem("token"));
  


  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated);




  // 1. Mobile Responsiveness: Automatically collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Auth Check: Check for token (you can replace this with your actual auth logic)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


//


const initialize = useAuthStore((state) => state.initialize);
  
  // Run your OAuth URL token check right away
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Execute TanStack Query fetch and auto-sync to your userStore
  const { isLoading } = useUserAuth();

  // if (isLoading) {
  //   return <div className="flex h-screen items-center justify-center">Logging in...</div>;
  // }

  useEffect(() => {
    {isLoading ? console.log("isLoading") : console.log("not loading");}

  },[isLoading]);
  
  return (
    <aside
      className={`transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } bg-[#161d27] border-r border-white/10 flex flex-col h-screen sticky top-0`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-[#0f172a]">
              <Plus className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1d2633] px-3 py-2 text-sm text-slate-300">
              <Search className="h-4 w-4" />
              <span>Contents...</span>
            </div>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleCollapse}
          className={`text-slate-300 hover:bg-white/5 hover:text-white ${isCollapsed ? "mx-auto" : ""}`}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content Area */}
      {!isCollapsed && (
        <ScrollArea className="flex-1 px-4 pb-6">
          {isAuthenticated ? (
            <>
              {/* Recents Section */}
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between px-2">
                  <h3 className="text-xl font-semibold text-slate-100">Recents</h3>
                  <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-white">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {recentItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-[#202938] px-3 py-3 text-left text-slate-300 transition hover:border-cyan-400/30 hover:bg-[#283244] hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="truncate text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorites Section */}
              <div>
                <div className="mb-4 flex items-center justify-between px-2">
                  <h3 className="text-xl font-semibold text-slate-100">Favorites</h3>
                  <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-white">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {favoriteItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="truncate text-sm">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Logged Out View */
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <p className="text-slate-400 text-sm">Sign in to see your recent activity and favorites.</p>
              <Link href="/signup" className="w-full">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </ScrollArea>
      )}

      {/* Optional: Collapsed Sign In Icon */}
      {isCollapsed && !isAuthenticated && (
        <div className="mt-auto mb-4 flex justify-center">
          <Link href="/signup">
            <Button size="icon" variant="ghost" className="text-cyan-400 hover:bg-white/5">
              <LogIn className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      )}
    </aside>
  );
}
