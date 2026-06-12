"use client";

import { useSummarizerStore } from "../../store/useSummarizerStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
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
    <main className="flex flex-1 flex-col bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_28%),linear-gradient(180deg,#1a2230_0%,#111827_100%)]">
      <section className="mx-auto w-full max-w-5xl">
        <Card className="overflow-hidden rounded-l border border-white/10 bg-forground/95 shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-6 py-2 sm:px-2">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Pamas EduPilot
            </h2>
            <p className="hidden md:flex mt-1 text-sm text-slate-400">
              Paste your content, choose a mode, and generate a smart response.
            </p>
          </div>

          <div className="flex flex-col">
            {/* AI Output */}
            <div className=" py-2 lg:border-l lg:border-t-0  sm:px-2">
              <div className="min-h-[20px] rounded-lg border border-white/10 bg-[#0b1220] py-5 px-2 sm:px-0 ">
                {summary ? (
                  <div className="markdown-content prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {summary}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex h-20 min-h-[20px] flex-col items-center justify-center text-center">
                    <h3 className=" hidden text-lg font-semibold text-slate-100">
                      Your result will appear here
                    </h3>
                    <p className="hidden md:flex mt-2 max-w-sm text-sm text-slate-400 ">
                      Choose a mode, paste your text, and run the assistant to
                      see the generated output.
                    </p>
                    <p className="flex md:hidden mt-2 max-w-sm text-xs text-slate-400">
                      You prompt, we result.
                    </p>
                  </div>
                )}
              </div>

              <Separator className="my-5 bg-primary/10" />
            </div>

            {/* Input Content */}
            <div className="p-6">
              <div className="flex relative min-h-[20px] resize-none rounded-2xl bg-[#0f172a] px-4 py-1 items-center bottom-0 left-0 right-0">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste lecture notes, article text, research material, or classroom content here..."
                  className="hidden md:flex min-h-[20px] resize-none rounded-2xl border-0 bg-transparent px-4 py-4  text-white  placeholder:text-slate-500 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your content here..."
                  className="flex md:hidden min-h-[20px] resize-none rounded-2xl border-0 bg-transparent px-2 py-4  text-white  placeholder:text-slate-500 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-4xs"
                />

                <Button
                  onClick={processContent}
                  disabled={loading}
                  className="h-12 rounded-full bg-primary shadow-none outline-none ring-0 hover:bg-cyan-400 hover:mx-[-2] active:my-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-slate-600 disabled:text-slate-300 absolute right-4 bottom-1"
                >
                  <ArrowUp className="h-21 text-white" size={63} />
                </Button>
              </div>
              <div className="mt-5 flex justify-end">
                <h2 className="text-primary text-sm sm:text-base">
                  {loading ? (
                    <>
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                    </>
                  ): "Generate AI Result"}
                </h2>
              </div>

              <div className="rounded-2xl px-4 py-3 text-l sm:text-xl text-slate-400">
                Current mode:{" "}
                <span className="font-medium text-slate-200">{mode}</span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
