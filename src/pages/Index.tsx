import { useState } from "react";
import { Mic, ChevronRight, Moon, BookOpen, MessageSquare, ArrowRight, Sparkles, Clock, Music, MapPin, Wifi, BedDouble, CheckSquare } from "lucide-react";
import ShortcutsTab from "./ShortcutsTab";

const EXAMPLE_PROMPT = "At 1am open ChatGPT and start a chat";

const EXISTING_AUTOMATIONS = [
  {
    id: 1,
    triggerIcon: BedDouble,
    triggerColor: "text-ios-cyan",
    triggerBg: "bg-ios-cyan/15",
    actionIcon: BookOpen,
    actionColor: "text-ios-orange",
    actionBg: "bg-ios-orange/15",
    title: "When Wind Down starts",
    subtitle: "Open Book",
  },
  {
    id: 2,
    triggerIcon: Clock,
    triggerColor: "text-ios-blue",
    triggerBg: "bg-ios-blue/15",
    actionIcon: Music,
    actionColor: "text-[hsl(340,80%,55%)]",
    actionBg: "bg-[hsl(340,80%,55%)]/15",
    title: "Every weekday at 7:00 AM",
    subtitle: "Play Workout Playlist",
  },
  {
    id: 3,
    triggerIcon: MapPin,
    triggerColor: "text-ios-green",
    triggerBg: "bg-ios-green/15",
    actionIcon: Wifi,
    actionColor: "text-ios-blue",
    actionBg: "bg-ios-blue/15",
    title: "When I arrive home",
    subtitle: "Connect to Home Wi-Fi",
  },
];

type ActiveTab = "shortcuts" | "automation" | "gallery";

export default function RoutineWizard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("automation");
  const [inputValue, setInputValue] = useState(EXAMPLE_PROMPT);
  const [phase, setPhase] = useState<"input" | "loading" | "result">("input");
  const [automations, setAutomations] = useState(EXISTING_AUTOMATIONS);

  const handleRun = () => {
    if (phase !== "input") return;
    setPhase("loading");
    setTimeout(() => {
      setAutomations((prev) => [
        {
          id: Date.now(),
          triggerIcon: Moon,
          triggerColor: "text-ios-cyan",
          triggerBg: "bg-ios-cyan/15",
          actionIcon: MessageSquare,
          actionColor: "text-ios-green",
          actionBg: "bg-ios-green/15",
          title: "Every day at 1:00 AM",
          subtitle: "Open ChatGPT → Start chat",
        },
        ...prev,
      ]);
      setPhase("result");
    }, 1200);
  };

  const handleReset = () => {
    setPhase("input");
    setInputValue(EXAMPLE_PROMPT);
    setAutomations(EXISTING_AUTOMATIONS);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* iOS Status area spacer */}
      <div className="h-12" />

      {/* Content */}
      <div className="flex-1 px-5 pt-1 overflow-y-auto pb-24">
        {activeTab === "shortcuts" && <ShortcutsTab />}
        {activeTab === "automation" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-0">
              {phase === "result" && (
                <button onClick={handleReset} className="text-ios-blue text-[17px] font-normal absolute right-5">
                  +
                </button>
              )}
            </div>
            <h1 className="text-[34px] font-bold tracking-tight text-foreground mb-4">Automation</h1>
            {phase === "input" && <InputPhase inputValue={inputValue} setInputValue={setInputValue} onRun={handleRun} />}
            {phase === "loading" && <LoadingPhase />}
            {phase === "result" && <ResultPhase automations={automations} />}
          </>
        )}
        {activeTab === "gallery" && (
          <div className="pt-4">
            <h1 className="text-[34px] font-bold tracking-tight text-foreground mb-4">Gallery</h1>
            <p className="text-muted-foreground text-[15px]">Browse shortcut collections</p>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
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
    <div className="animate-fade-up flex flex-col items-center pt-16 gap-5">
      <div className="flex items-center justify-center mb-2">
        <Sparkles className="w-12 h-12 text-ios-blue" strokeWidth={1.5} />
      </div>

      <div className="text-center mb-2">
        <h2 className="text-[22px] font-bold text-foreground">Routine Wizard Lite</h2>
        <p className="text-[15px] text-muted-foreground mt-1">Describe your automation in plain English</p>
      </div>

      {/* Input bar */}
      <div className="w-full relative">
        <div className="flex items-center bg-card rounded-2xl px-4 py-3 shadow-sm border border-border">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='e.g. At 1am open ChatGPT and start a chat'
            className="flex-1 bg-transparent text-[16px] text-foreground placeholder:text-muted-foreground outline-none"
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

interface AutomationItem {
  id: number;
  triggerIcon: React.ElementType;
  triggerColor: string;
  triggerBg: string;
  actionIcon: React.ElementType;
  actionColor: string;
  actionBg: string;
  title: string;
  subtitle: string;
}

function ResultPhase({ automations }: { automations: AutomationItem[] }) {
  const newOne = automations[0];
  const existing = automations.slice(1);

  return (
    <div className="animate-fade-up">
      {/* New automation - highlighted */}
      <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-3">Just Added</p>
      <AutomationCard item={newOne} highlighted />

      {/* Existing automations */}
      <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-3 mt-6">Personal</p>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border divide-y divide-border">
        {existing.map((item) => (
          <AutomationCard key={item.id} item={item} inline />
        ))}
      </div>
    </div>
  );
}

function AutomationCard({ item, highlighted, inline }: { item: AutomationItem; highlighted?: boolean; inline?: boolean }) {
  const TriggerIcon = item.triggerIcon;
  const ActionIcon = item.actionIcon;

  const wrapper = inline ? "" : "bg-card rounded-2xl shadow-sm border border-border";
  const highlight = highlighted ? "ring-2 ring-ios-blue/30" : "";

  return (
    <div className={`${wrapper} ${highlight} p-4`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl ${item.triggerBg} flex items-center justify-center`}>
          <TriggerIcon className={`w-5 h-5 ${item.triggerColor}`} strokeWidth={1.8} />
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
        <div className={`w-10 h-10 rounded-xl ${item.actionBg} flex items-center justify-center`}>
          <ActionIcon className={`w-5 h-5 ${item.actionColor}`} strokeWidth={1.8} />
        </div>
        <div className="flex-1" />
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-[15px] font-semibold text-foreground">{item.title}</p>
      <p className="text-[13px] text-muted-foreground">{item.subtitle}</p>
    </div>
  );
}

function BottomTabBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/80 backdrop-blur-xl">
      <div className="flex items-end justify-around pt-2 pb-7">
        <TabItem label="Shortcuts" active={false}>
          <BookOpen className="w-6 h-6" />
        </TabItem>
        <TabItem label="Automation" active>
          <div className="w-7 h-7 rounded-full bg-ios-blue flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3v8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </TabItem>
        <TabItem label="Gallery" active={false}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 15l4-4 4 4 4-6 5 6"/></svg>
        </TabItem>
      </div>
    </div>
  );
}

function TabItem({ label, active, children }: { label: string; active: boolean; children: React.ReactNode }) {
  return (
    <button className="flex flex-col items-center gap-1">
      <span className={active ? "text-ios-blue" : "text-muted-foreground"}>{children}</span>
      <span className={`text-[10px] font-medium ${active ? "text-ios-blue" : "text-muted-foreground"}`}>
        {label}
      </span>
    </button>
  );
}
