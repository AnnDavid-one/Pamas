"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react"; 
import { useSummarizerStore } from "../../store/useSummarizerStore";
import { Mode, ModelOption } from "@/types";

const ModelDropdown = () => {
  const { mode, setMode } = useSummarizerStore();
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  const handleSetMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    setIsOpen(false); 
  };

  const models: ModelOption[] = [
    { title: "Summarizer", description: "Summarize content.", value: "Summarizer" },
    { title: "Clarifier", description: "Gives results as roadmap.", value: "Roadmap" },
    { title: "Refiner", description: "Refine the content for better quality.", value: "Refiner" },
    { title: "Simplifier", description: "Simplify the content for easy understanding.", value: "Simplifier" },
    { title: "Explainer", description: "Explain the concept in a way that’s accessible to beginners.", value: "Explainer" },
    { title: "Humanizer", description: "Convert the content to a more human-like tone.", value: "Humanizer" }
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex md:hidden items-center text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-medium py-2 px-4 transition-colors duration-200"
      >
        <span className="font-semibold">Mode</span>
        <ChevronDown
          className={`ml-1 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <button
        onClick={toggleDropdown}
        className="hidden md:flex items-center text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-medium py-2 px-4 transition-colors duration-200"
      >
        <span className="font-semibold">Select Model</span>
        <ChevronDown
          className={`ml-1 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[99] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Menu Container */}
      <div
        className={`
          /* 1. Mobile First: Fixed, centered modal layout card */
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-[#1b2432] rounded-2xl border border-white/10 p-4 shadow-2xl z-[100]
          
          /* 2. Responsive Desktop Overrides: Standard dropdown context floating link */
          md:absolute md:top-auto md:left-0 md:right-auto md:translate-x-0 md:translate-y-0 md:mt-2 md:w-72 md:p-1 md:z-10
          
          transition-all duration-200
          ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        {/* Mobile Header: Visible only on smaller screens */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/5 md:hidden">
          <span className="font-semibold text-slate-200">Choose AI Persona</span>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of select options wrapper */}
        <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto md:max-h-none">
          {models.map((model) => (
            <button
              key={model.value}
              className={`
                flex flex-col w-full text-left px-4 py-3 rounded-xl transition-all duration-150
                ${mode === model.value 
                  ? 'bg-cyan-500/20 border border-cyan-500/30 text-white' 
                  : 'border border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                }
              `}
              onClick={() => handleSetMode(model.value as Mode)} 
            >
              <span className="font-medium text-sm">{model.title}</span>
              <span className="text-xs text-slate-400 mt-0.5 leading-relaxed">{model.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelDropdown;