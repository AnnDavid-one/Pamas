"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Icon for dropdown toggle
import { useSummarizerStore } from "../../store/useSummarizerStore"
import { Mode, ModelOption } from "@/types";


// state with zustand

// model drop downs
const ModelDropdown = () => {
  const {mode, setMode}=useSummarizerStore();

  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown visibility
  };


  const handleSetMode=(selectedMode:Mode)=>{
    setMode(selectedMode);
    setIsOpen(false); // Close dropdown after selection
  }

  // Array of model options
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
        className="flex items-center text-slate-300 hover:bg-white/5 hover:text-white rounded-md py-2 px-4 transition-colors duration-200"
      >
        <span className="text-bold hover:ml-1 transition-all duration-300">Select Model</span>
       
        <ChevronDown
          className={`ml-1 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-[10] right-0 mt-2 w-48 bg-card rounded-md shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none '}`}
        style={{ transition: 'opacity 0.3s, transform 0.3s' }}
      >
        {isOpen && (
          <div className="py-2">
            {/* Dropdown Options */}
            {/* Map through the models array and render buttons */}
            {models.map((model) => (
              <button
                key={model.value}
                className={`block px-4 py-2 text-sm text-white hover:bg-[#3a4d69] w-full text-left ${mode === model.value ? 'bg-[#3a4d69]' : ''}`}
                onClick={() => handleSetMode(model.value as Mode)} // Pass the model value
              >
                {model.title} {/* Display the model title */}
                <span className="text-xs text-slate-400">{model.description}</span> {/* Display the model description */}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDropdown;