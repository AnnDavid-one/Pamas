"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import HeaderAbout from "@/components/header/HeaderAbout";

// Asset Imports with your updated paths
import TeamSelfie from "../../../public/aboutPageImageA.jpg";
import ConnectedWorldPana from "../../../public/world-pana.svg";
import ConnectedWorldAmico from "../../../public/connected.svg";
import ProblemSolvingPana from "../../../public/solving-pana.svg";
import hiddednPerson from "../../../public/hiddednPerson.svg";
import GoodTeamPana from "../../../public/team-pana.svg";
import { useUserStore } from "@/store/useUserStore";



export default function AboutPage() {

 



  return (
    <div className="flex flex-col min-h-screen bg-foreground  gap-6 text-xl select-none">
      {/* Header */}
      <HeaderAbout />
      <div className="flex flex-col min-h-screen bg-foreground p-3 gap-6 text-xl select-none">

      {/* 1. HERO & MAIN CONTENT CARD */}
      <main className="flex flex-col w-full bg-card rounded-2xl shadow-xl p-2 md:p-12 relative overflow-hidden group border border-white/5">
        {/* Massive background vector illustration */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-72 h-72 opacity-15 pointer-events-none hidden lg:block transition-transform duration-700 group-hover:rotate-3">
          <Image src={hiddednPerson} alt="Problem Solving" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <h1 className="text-xl md:text-5xl font-black text-white flex items-center gap-3 tracking-tight">
            About Pamas Ai 
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </h1>
          
          {/* Your original text completely untouched */}
          <p className="text-gray-300 text-sm md:text-2xl font-light leading-relaxed">
            Pamas Ai is an innovative platform designed by Okechukwu David to simplify prompting. Our mission is to help users quickly extract key insights from lengthy texts, saving time required for frequently used prompts and boosting productivity.
          </p>
          <p className="text-gray-400 text-sm md:text-xl leading-relaxed">
            Founded with a focus on user-centric design, we leverage cutting-edge AI technology to deliver accurate and concise results for various content types, including articles, research papers, and meeting notes.
          </p>
          <p className="text-gray-400 text-sm md:text-xl leading-relaxed">
            We are committed to continuous improvement, ensuring our tools evolve to meet the changing needs of our users.
          </p>
        </div>
      </main>

      {/* 2. HUGE TEAM & SVG SHOWCASE GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-white/5 items-center relative overflow-hidden">
        {/* Subtle decorative background vector */}
        {/* the bottom image that displays over text */}
        <div className="absolute -right-1 -bottom-6 md:-right-16 md:-bottom-16 w-24 h-24 md:w-64 md:h-64 opacity-80 pointer-events-none">
          <Image src={GoodTeamPana} alt="Team background" />
        </div>

        {/* Left Side: Scaled-Up Selfie Image Frame */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <div className="relative group w-full max-w-sm h-[420px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#16222F]">
            <Image
              src={TeamSelfie}
              alt="Engineering Team Core"
              fill
              className="object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* Absolute template identity tag layout */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl text-center">
              <p className="text-white font-bold text-lg tracking-wide">David Hart </p>
              <p className="text-primary text-xs font-medium uppercase tracking-widest mt-0.5">CEO & Founder of Pamas Ai</p>
            </div>
          </div>
        </div>

        {/* Right Side: Much Bigger Connected SVGs Layout Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-6 w-full">
          <div className="text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Your Digital Gems</h2>
            <p className="text-gray-400 text-sm md:text-lg mt-1">Collaborative intelligence infrastructure driving performance.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* SVG Box 1 */}
            <div className="bg-[#111A24]/80 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-teal-500/30 hover:bg-[#152332]/90 transition duration-300 shadow-md">
              <div className="w-28 h-28 mb-4 relative transition-transform duration-300 group-hover:scale-110">
                <Image src={ConnectedWorldPana} alt="Network Sphere" fill className="object-contain" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">Prompt Caching</h3>
              <p className="text-sm md:text-lg text-gray-400 leading-relaxed max-w-[200px]">Saving computational execution time instantly.</p>
            </div>

            {/* SVG Box 2 */}
            <div className="bg-[#111A24]/80 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-teal-500/30 hover:bg-[#152332]/90 transition duration-300 shadow-md">
              <div className="w-28 h-28 mb-4 relative transition-transform duration-300 group-hover:scale-110">
                <Image src={ConnectedWorldAmico} alt="Linked Platforms" fill className="object-contain" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">Global Intelligence</h3>
              <p className="text-sm md:text-lg text-gray-400 leading-relaxed max-w-[200px]">Concise, unified extraction workflows.</p>
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-2 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary font-bold hover:text-teal-300 transition group tracking-wide">
              Back to Workspace 
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>
        </div>
      </section>

        
      </div>
    </div>
  );
}