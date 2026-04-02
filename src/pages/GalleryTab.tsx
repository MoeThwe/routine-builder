import {
  Clock,
  Moon,
  MessageSquare,
  Music,
  MapPin,
  Wifi,
  BedDouble,
  BookOpen,
  Sun,
  Battery,
  Mail,
  Bell,
  Camera,
  CloudRain,
  Plane,
  Coffee,
  Zap,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface HistoryItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  triggerIcon: React.ElementType;
  triggerColor: string;
  triggerBg: string;
  actionIcon: React.ElementType;
  actionColor: string;
  actionBg: string;
}

const HISTORY: HistoryItem[] = [
  {
    id: 1,
    title: "Every day at 1:00 AM",
    subtitle: "Open ChatGPT → Start chat",
    date: "Today",
    triggerIcon: Moon,
    triggerColor: "text-ios-cyan",
    triggerBg: "bg-ios-cyan/15",
    actionIcon: MessageSquare,
    actionColor: "text-ios-green",
    actionBg: "bg-ios-green/15",
  },
  {
    id: 2,
    title: "When Wind Down starts",
    subtitle: "Open Book",
    date: "Yesterday",
    triggerIcon: BedDouble,
    triggerColor: "text-ios-cyan",
    triggerBg: "bg-ios-cyan/15",
    actionIcon: BookOpen,
    actionColor: "text-ios-orange",
    actionBg: "bg-ios-orange/15",
  },
  {
    id: 3,
    title: "Every weekday at 7:00 AM",
    subtitle: "Play Workout Playlist",
    date: "Mar 30",
    triggerIcon: Clock,
    triggerColor: "text-ios-blue",
    triggerBg: "bg-ios-blue/15",
    actionIcon: Music,
    actionColor: "text-ios-pink",
    actionBg: "bg-ios-pink/15",
  },
  {
    id: 4,
    title: "When I arrive home",
    subtitle: "Connect to Home Wi-Fi",
    date: "Mar 29",
    triggerIcon: MapPin,
    triggerColor: "text-ios-green",
    triggerBg: "bg-ios-green/15",
    actionIcon: Wifi,
    actionColor: "text-ios-blue",
    actionBg: "bg-ios-blue/15",
  },
];

interface ExampleWorkflow {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  category: string;
}

const EXAMPLE_WORKFLOWS: ExampleWorkflow[] = [
  {
    id: 1,
    title: "Morning Routine",
    description: "Disable DND, play news podcast, show weather",
    icon: Sun,
    iconBg: "bg-ios-orange",
    category: "Daily",
  },
  {
    id: 2,
    title: "Low Battery Saver",
    description: "When battery < 20%, enable Low Power Mode",
    icon: Battery,
    iconBg: "bg-ios-green",
    category: "Utility",
  },
  {
    id: 3,
    title: "Email Digest",
    description: "At 9 AM, read unread email count aloud",
    icon: Mail,
    iconBg: "bg-ios-blue",
    category: "Productivity",
  },
  {
    id: 4,
    title: "Focus Timer",
    description: "Start 25-min timer, silence notifications",
    icon: Bell,
    iconBg: "bg-ios-purple",
    category: "Productivity",
  },
  {
    id: 5,
    title: "Rainy Day Playlist",
    description: "When rain is forecast, queue chill playlist",
    icon: CloudRain,
    iconBg: "bg-ios-indigo",
    category: "Entertainment",
  },
  {
    id: 6,
    title: "Travel Mode",
    description: "At airport, enable Airplane Mode + save boarding pass",
    icon: Plane,
    iconBg: "bg-ios-cyan",
    category: "Travel",
  },
  {
    id: 7,
    title: "Coffee Order",
    description: "At coffee shop, send usual order via Messages",
    icon: Coffee,
    iconBg: "bg-ios-yellow",
    category: "Daily",
  },
  {
    id: 8,
    title: "Screenshot to PDF",
    description: "Take screenshot, convert to PDF, save to Files",
    icon: Camera,
    iconBg: "bg-ios-pink",
    category: "Utility",
  },
];

export default function GalleryTab() {
  return (
    <div className="animate-fade-up">
      <h1 className="text-[34px] font-bold tracking-tight text-foreground mb-5">Gallery</h1>

      {/* Your Automations History */}
      <h2 className="text-[22px] font-bold text-foreground mb-3">Your Automations</h2>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border divide-y divide-border mb-6">
        {HISTORY.map((item) => {
          const TriggerIcon = item.triggerIcon;
          const ActionIcon = item.actionIcon;
          return (
            <button key={item.id} className="w-full flex items-center gap-3 px-4 py-3 text-left">
              <div className={`w-10 h-10 rounded-xl ${item.triggerBg} flex items-center justify-center shrink-0`}>
                <TriggerIcon className={`w-5 h-5 ${item.triggerColor}`} strokeWidth={1.8} />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <div className={`w-10 h-10 rounded-xl ${item.actionBg} flex items-center justify-center shrink-0`}>
                <ActionIcon className={`w-5 h-5 ${item.actionColor}`} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0 ml-1">
                <p className="text-[15px] font-semibold text-foreground truncate">{item.title}</p>
                <p className="text-[13px] text-muted-foreground truncate">{item.subtitle}</p>
              </div>
              <span className="text-[13px] text-muted-foreground shrink-0">{item.date}</span>
            </button>
          );
        })}
      </div>

      {/* Example Workflows */}
      <h2 className="text-[22px] font-bold text-foreground mb-1">Quick Start</h2>
      <p className="text-[15px] text-muted-foreground mb-3">Tap to activate instantly</p>

      <div className="grid grid-cols-2 gap-3">
        {EXAMPLE_WORKFLOWS.map((wf) => {
          const Icon = wf.icon;
          return (
            <button
              key={wf.id}
              className="bg-card rounded-2xl p-4 border border-border shadow-sm text-left flex flex-col gap-3 active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${wf.iconBg} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.8} />
                </div>
                <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {wf.category}
                </span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-foreground leading-tight">{wf.title}</p>
                <p className="text-[12px] text-muted-foreground mt-1 leading-snug">{wf.description}</p>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <Zap className="w-3.5 h-3.5 text-ios-blue" />
                <span className="text-[12px] font-medium text-ios-blue">Activate</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
