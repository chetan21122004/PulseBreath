import { X, HelpCircle, AlertTriangle } from "lucide-react";
const problemHands = "/assets/problem-hands.jpg";

const items = [
  "Discharged with only a generic exercise sheet",
  "No specialist supervision while exercising",
  "Fear of moving wrong and causing harm",
  "No monitoring of heart rate or oxygen response",
];

export function ProblemBlock() {
  return (
    <div className="mx-auto max-w-6xl px-6 py">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-soft" />
          <Image
            src={problemHands}
            alt="Patient receiving guidance"
            loading="lazy"
            width={800}
            height={800}
            className="relative w-full rounded-2xl"
          />
        </div>
        <div>
          <span className="pill">The Problem</span>
          <h2 className="heading-display mt-6">
            After hospital discharge,{" "}
            <span className="text-brand">most patients are left guessing.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--body-text)]">
            Heart and lung patients are sent home with{" "}
            <strong className="text-navy">little guidance on how to move safely</strong>. They either
            do too little - and lose strength rapidly - or too much - and risk complications.
          </p>
          <div className="mt-8 flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-brand" />
            <h3 className="font-display text-2xl font-bold">Why?</h3>
          </div>
          <ul className="mt-5 space-y-4 border-l-2 border-brand pl-5">
            {items.map((it) => (
              <li key={it} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-soft">
                  <X className="h-4 w-4 text-brand" />
                </span>
                <span className="text-navy/85">{it}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3 border-l-2 border-brand pl-5 italic text-navy/85">
            <AlertTriangle className="h-7 w-7 shrink-0 text-brand" />
            <p>
              Recovery from cardiac or pulmonary conditions needs{" "}
              <strong className="not-italic">specialist supervision</strong> - not a printed handout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import Image from "next/image";
