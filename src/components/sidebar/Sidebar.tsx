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
      {(!isCollapsed || isMobileOpen) && (
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

      {/* Collapsed Sign In Icon (Desktop mode helper) */}
      {isCollapsed && !isAuthenticated && (
        <div className="mt-auto mb-4 hidden md:flex justify-center">
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