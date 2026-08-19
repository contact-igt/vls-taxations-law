const STAGES = ["Department", "Appeal", "Tribunal", "High Court"];

export function DisputeJourneyVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-3 lg:gap-y-2 ${
        compact ? "" : "py-4"
      }`}
    >
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex items-center gap-2 lg:gap-3">
          <span
            className={`font-serif font-medium tracking-tight text-white ${
              compact ? "text-[20px] sm:text-[24px]" : "text-[26px] sm:text-[32px] lg:text-[40px] xl:text-[48px]"
            }`}
          >
            {stage}
          </span>
          {i < STAGES.length - 1 && (
            <span aria-hidden="true" className="text-vls-gold">
              <span className="hidden lg:inline">→</span>
              <span className="lg:hidden">↓</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
