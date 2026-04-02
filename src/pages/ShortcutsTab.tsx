import { useState } from "react";
import {
  Search,
  Mic,
  MoreHorizontal,
  ChevronRight,
  FolderOpen,
  Share,
  Watch,
  BookOpen,
  Camera,
  MessageSquare,
  CheckSquare,
  Clock,
  Headphones,
  Video,
  FileText,
  Sparkles,
  Music,
} from "lucide-react";

type ShortcutsView = "main" | "all";

const SHORTCUT_CARDS = [
  {
    id: 1,
    title: "Remove Background from Portrait",
    icon: Camera,
    bg: "bg-ios-pink",
  },
  {
    id: 2,
    title: "Take a Break",
    icon: Clock,
    bg: "bg-ios-orange",
  },
  {
    id: 3,
    title: "Text Last Image",
    icon: MessageSquare,
    bg: "bg-ios-green",
  },
  {
    id: 4,
    title: "Shazam shortcut",
    icon: Music,
    bg: "bg-ios-indigo",
  },
  {
    id: 5,
    title: "What's a shortcut?",
    icon: Sparkles,
    bg: "bg-ios-purple",
  },
];

const APP_SHORTCUTS = [
  { name: "Books", icon: BookOpen, color: "bg-ios-orange" },
  { name: "Camera", icon: Camera, color: "bg-[hsl(0,0%,60%)]" },
  { name: "ChatGPT", icon: MessageSquare, color: "bg-foreground" },
  { name: "Check In", icon: CheckSquare, color: "bg-ios-yellow" },
  { name: "Clock", icon: Clock, color: "bg-foreground" },
  { name: "FaceTime", icon: Video, color: "bg-ios-green" },
  { name: "Files", icon: FileText, color: "bg-ios-blue" },
  { name: "Gemini", icon: Sparkles, color: "bg-ios-purple" },
  { name: "Headphones", icon: Headphones, color: "bg-ios-orange" },
  { name: "Music", icon: Music, color: "bg-ios-pink" },
];

export default function ShortcutsTab() {
  const [view, setView] = useState<ShortcutsView>("main");

  if (view === "all") {
    return <AllShortcutsView onBack={() => setView("main")} />;
  }

  return <MainShortcutsView onOpenAll={() => setView("all")} />;
}

function MainShortcutsView({ onOpenAll }: { onOpenAll: () => void }) {
  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-ios-blue text-[17px]">Edit</span>
        <div className="w-7 h-7 text-ios-blue">
          <FolderOpen className="w-6 h-6" />
        </div>
      </div>
      <h1 className="text-[34px] font-bold tracking-tight text-foreground mb-5">Shortcuts</h1>

      {/* Shortcuts section */}
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border divide-y divide-border mb-6">
        <ListRow icon={FolderOpen} label="All Shortcuts" count={5} onClick={onOpenAll} />
        <ListRow icon={Share} label="Share Sheet" />
        <ListRow icon={Watch} label="Apple Watch" count={3} />
      </div>

      {/* Folders section */}
      <h2 className="text-[22px] font-bold text-foreground mb-3">Folders</h2>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border mb-6">
        <ListRow icon={FolderOpen} label="Starter Shortcuts" count={4} />
      </div>

      {/* App Shortcuts section */}
      <h2 className="text-[22px] font-bold text-foreground mb-3">App Shortcuts</h2>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border p-4">
        <div className="grid grid-cols-2 gap-4">
          {APP_SHORTCUTS.map((app) => {
            const Icon = app.icon;
            return (
              <button key={app.name} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.8} />
                </div>
                <span className="text-[15px] text-foreground">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AllShortcutsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <button onClick={onBack} className="text-ios-blue text-[17px] flex items-center gap-0.5">
          <ChevronRight className="w-5 h-5 rotate-180" />
          Shortcuts
        </button>
        <div className="flex items-center gap-4">
          <span className="text-ios-blue text-[17px]">Select</span>
          <span className="text-ios-blue text-[22px] font-light">+</span>
        </div>
      </div>
      <h1 className="text-[34px] font-bold tracking-tight text-foreground mb-4">All Shortcuts</h1>

      {/* Search bar */}
      <div className="flex items-center bg-muted rounded-xl px-3 py-2 mb-5">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <span className="text-[16px] text-muted-foreground flex-1">Search</span>
        <Mic className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Shortcut cards - first one full width */}
      <div className="mb-5">
        <ShortcutCard card={SHORTCUT_CARDS[0]} fullWidth />
      </div>

      {/* Starter Shortcuts section */}
      <div className="flex items-center gap-2 mb-3">
        <FolderOpen className="w-5 h-5 text-ios-blue" />
        <h2 className="text-[20px] font-bold text-foreground flex-1">Starter Shortcuts</h2>
        <span className="text-ios-blue text-[22px] font-light">+</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {SHORTCUT_CARDS.slice(1).map((card) => (
          <ShortcutCard key={card.id} card={card} />
        ))}
      </div>

      {/* Books section */}
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-ios-orange" />
        <h2 className="text-[20px] font-bold text-foreground">Books</h2>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-ios-yellow rounded-2xl p-4 aspect-[4/3] flex flex-col justify-end">
          <div className="flex gap-2 mb-auto">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({
  card,
  fullWidth,
}: {
  card: (typeof SHORTCUT_CARDS)[0];
  fullWidth?: boolean;
}) {
  const Icon = card.icon;
  return (
    <div
      className={`${card.bg} rounded-2xl p-4 ${fullWidth ? "w-1/2" : ""} aspect-[4/3] flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.8} />
        </div>
        <MoreHorizontal className="w-5 h-5 text-primary-foreground/60" />
      </div>
      <p className="text-[15px] font-semibold text-primary-foreground leading-tight">{card.title}</p>
    </div>
  );
}

function ListRow({
  icon: Icon,
  label,
  count,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 text-left">
      <Icon className="w-5 h-5 text-ios-blue" strokeWidth={1.8} />
      <span className="flex-1 text-[17px] text-foreground">{label}</span>
      {count !== undefined && <span className="text-[17px] text-muted-foreground">{count}</span>}
      <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
    </button>
  );
}
