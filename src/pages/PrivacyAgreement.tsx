import { useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";

const SECTIONS = [
  {
    title: "Data Collection",
    content:
      "Routine Wizard Lite collects minimal data to provide automation services. This includes your automation prompts, device settings, and usage patterns. We do not collect personal identifiers unless you explicitly provide them.",
  },
  {
    title: "How We Use Your Data",
    content:
      "Your data is used solely to generate and manage automations on your device. Prompts are processed locally and are never shared with third parties. Analytics data is anonymised and used only to improve the app experience.",
  },
  {
    title: "Third-Party Services",
    content:
      "Some automations may interact with third-party apps (e.g. ChatGPT, Apple Music). Routine Wizard Lite does not control these services. Please review their respective privacy policies for more information.",
  },
  {
    title: "Data Storage & Security",
    content:
      "All automation data is stored locally on your device. We use industry-standard encryption to protect your information. You can delete all data at any time from Settings.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, modify, or delete your data at any time. You may withdraw consent by discontinuing use of the app. For questions, contact privacy@routinewizard.app.",
  },
];

export default function PrivacyAgreement({ onAccept }: { onAccept: () => void }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
      setScrolledToBottom(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-12" />

      <div className="flex-1 px-5 pt-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 mb-6">
          <div className="w-16 h-16 rounded-full bg-ios-blue/10 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-ios-blue" strokeWidth={1.5} />
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-foreground text-center">
            Terms & Privacy
          </h1>
          <p className="text-[15px] text-muted-foreground mt-2 text-center max-w-[300px]">
            Please review our terms before continuing
          </p>
        </div>

        {/* Scrollable terms */}
        <div
          className="flex-1 overflow-y-auto rounded-2xl bg-card border border-border mb-5"
          onScroll={handleScroll}
        >
          <div className="p-5">
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
              By using Routine Wizard Lite, you agree to the following terms and conditions. We value your privacy and are committed to protecting your personal information.
            </p>

            {SECTIONS.map((section, i) => {
              const isOpen = expandedIdx === i;
              return (
                <div key={i} className="border-t border-border">
                  <button
                    onClick={() => setExpandedIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-[16px] font-semibold text-foreground">
                      {section.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-[14px] text-muted-foreground leading-relaxed pb-4 -mt-1">
                      {section.content}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="border-t border-border pt-4 mt-1">
              <p className="text-[12px] text-muted-foreground text-center">
                Last updated: April 2026 · Version 1.0
              </p>
            </div>
          </div>
        </div>

        {/* Accept button */}
        <div className="pb-10">
          <button
            onClick={onAccept}
            disabled={!scrolledToBottom}
            className={`w-full text-[17px] font-semibold py-4 rounded-2xl flex items-center justify-center transition-all ${
              scrolledToBottom
                ? "bg-ios-blue text-primary-foreground active:opacity-80"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {scrolledToBottom ? "Agree & Continue" : "Scroll to review all terms"}
          </button>
        </div>
      </div>
    </div>
  );
}
