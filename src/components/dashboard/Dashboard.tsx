"use client";

import { useSummarizerStore } from "../../store/useSummarizerStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, LoaderCircle } from "lucide-react";

export default function Dashboard() {
  const {
    text,
    summary,
    mode,
    loading,
    setText,
    setMode,
    processContent,
    error,
  } = useSummarizerStore();

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-[20dvh] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_28%),linear-gradient(180deg,#1a2230_0%,#111827_100%)]">
      
      {/* Scrollable output area — grows to fill all available space */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-3xl">
          {summary ? (
            <div className="markdown-content prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {summary}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex h-full min-h-[60vh] flex-col items-center justify-center text-center">
              <p className="text-slate-400 text-sm md:text-base">
                Paste your content, choose a mode, and generate a smart response.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky input — always stays at the bottom */}
      <div className="sticky bottom-10 w-full border-t border-white/10 bg-[#111827]/90 backdrop-blur-sm px-4 py-4">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex relative rounded-2xl bg-[#0f172a] border border-white/10 px-4 py-2 items-end">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste lecture notes, article text, research material..."
              className="hidden md:flex min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent px-2 py-2 text-white placeholder:text-slate-500 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your content here..."
              className="flex md:hidden min-h-[44px] max-h-[160px] resize-none border-0 bg-transparent px-2 py-2 text-white placeholder:text-slate-500 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              onClick={processContent}
              disabled={loading}
              className="h-8 w-8 md:h-10 md:w-10 mb-1 flex-shrink-0 rounded-full bg-primary shadow-none outline-none ring-0 hover:bg-cyan-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-slate-600 disabled:text-slate-300"
            >
              {loading
                ? <LoaderCircle className="h-4 w-4 animate-spin text-white" />
                : <ArrowUp className="text-white" size={18} />
              }
            </Button>
          </div>

          {loading && (
            <p className="mt-2 text-right text-xs text-primary">Processing...</p>
          )}
        </div>
      </div>
    </div>
  );
}