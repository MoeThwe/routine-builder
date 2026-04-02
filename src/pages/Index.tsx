import { useState } from "react";
import { Mic, ChevronRight, Moon, BookOpen, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

const EXAMPLE_PROMPT = "At 1am open ChatGPT and start a chat";

const MOCK_RESULTS = [
  {
    id: 1,
    trigger: { icon: Moon, color: "text-ios-cyan", bg: "bg-ios-cyan/10", label: "1:00 AM" },
    action: { icon: MessageSquare, color: "text-ios-green", bg: "bg-ios-green/10", label: "Open ChatGPT" },
    title: "When it's 1:00 AM",
    subtitle: "Open ChatGPT → Start new chat",
  },
];

export default function RoutineWizard() {
  const [inputValue, setInputValue] = useState("");
  const [phase, setPhase] = useState<"input" | "loading" | "result">("input");

  const handleRun = () => {
    if (phase !== "input") return;
    setInputValue(inputValue || EXAMPLE_PROMPT);
    setPhase("loading");
    setTimeout(() => setPhase("result"), 1200);
  };

  const handleReset = () => {
    setPhase("input");
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* iOS Status area spacer */}
      <div className="h-14" />

      {/* Header */}
      <div className="px-5 pb-2 flex items-center justify-between">
        <h1 className="text-[34px] font-bold tracking-tight text-foreground">Automation</h1>
        {phase === "result" && (
          <button onClick={handleReset} className="text-ios-blue text-[17px] font-normal">
            Clear
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-4">
        {phase === "input" && <InputPhase inputValue={inputValue} setInputValue={setInputValue} onRun={handleRun} />}
        {phase === "loading" && <LoadingPhase />}
        {phase === "result" && <ResultPhase />}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}

function InputPhase({
  inputValue,
  setInputValue,
  onRun,
}: {
  inputValue: string;
  setInputValue: (v: string) => void;
  onRun: () => void;
}) {
  return (
    <div className="animate-fade-up flex flex-col items-center pt-24 gap-5">
      {/* Sparkle icon */}
      <div className="flex items-center justify-center mb-2">
        <Sparkles className="w-12 h-12 text-ios-blue" strokeWidth={1.5} />
      </div>

      <div className="text-center mb-4">
        <h2 className="text-[22px] font-bold text-foreground">Routine Wizard Lite</h2>
        <p className="text-[15px] text-muted-foreground mt-1">Describe your automation in plain English</p>
      </div>

      {/* Input bar */}
      <div className="w-full relative">
        <div className="flex items-center bg-card rounded-2xl px-4 py-3 shadow-sm border border-border">
          <span className="animate-typing-cursor text-ios-blue mr-1 font-light">|</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='e.g. At 1am open ChatGPT and start a chat'
            className="flex-1 bg-transparent text-[17px] text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="ml-2 w-9 h-9 rounded-full bg-ios-blue flex items-center justify-center animate-siri-glow shrink-0">
            <Mic className="w-[18px] h-[18px] text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Run button */}
      <button
        onClick={onRun}
        className="w-full bg-ios-blue text-primary-foreground text-[17px] font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
      >
        Run <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function LoadingPhase() {
  return (
    <div className="animate-fade-up flex flex-col items-center pt-40 gap-4">
      <div className="w-10 h-10 rounded-full border-[3px] border-ios-blue/20 border-t-ios-blue animate-spin" />
      <p className="text-[17px] text-muted-foreground">Generating your automation…</p>
    </div>
  );
}

function ResultPhase() {
  return (
    <div className="animate-fade-up">
      <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Generated Automation</p>

      {/* Result card */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
        <div className="p-4">
          {/* Icons row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-ios-cyan/15 flex items-center justify-center">
              <Moon className="w-6 h-6 text-ios-cyan" strokeWidth={1.8} />
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="w-11 h-11 rounded-xl bg-ios-green/15 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-ios-green" strokeWidth={1.8} />
            </div>
            <div className="flex-1" />
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <p className="text-[17px] font-semibold text-foreground">When it's 1:00 AM</p>
          <p className="text-[15px] text-muted-foreground">Open ChatGPT → Start new chat</p>
        </div>
      </div>

      {/* Details section */}
      <div className="mt-6">
        <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Steps</p>
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border divide-y divide-border">
          <StepRow number={1} title="Trigger: Time of Day" subtitle="Every day at 1:00 AM" />
          <StepRow number={2} title="Open App" subtitle="Launch ChatGPT" />
          <StepRow number={3} title="Action" subtitle="Start a new conversation" />
        </div>
      </div>

      {/* Save button */}
      <button className="w-full mt-6 bg-ios-blue text-primary-foreground text-[17px] font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 active:opacity-80 transition-opacity">
        Save Automation
      </button>
    </div>
  );
}

function StepRow({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-7 h-7 rounded-full bg-ios-blue/10 flex items-center justify-center shrink-0">
        <span className="text-[13px] font-bold text-ios-blue">{number}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-foreground">{title}</p>
        <p className="text-[13px] text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </div>
  );
}

function BottomTabBar() {
  const tabs = [
    { label: "Shortcuts", icon: BookOpen, active: false },
    { label: "Automation", icon: () => (
      <div className="w-7 h-7 rounded-full bg-ios-blue flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3v8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
    ), active: true },
    { label: "Gallery", icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 15l4-4 4 4 4-6 5 6"/></svg>
    ), active: false },
  ];

  return (
    <div className="border-t border-border bg-card/80 backdrop-blur-xl">
      <div className="flex items-end justify-around pt-2 pb-7">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.label} className="flex flex-col items-center gap-1">
              <Icon className={`w-6 h-6 ${tab.active ? "text-ios-blue" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${tab.active ? "text-ios-blue" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
