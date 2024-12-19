import { DecorationChoice } from "../types";
import ORNAMENT_CHOICES from "../ornaments-details.json";

interface OrnamentChooserProps {
  onSelect: (type: string) => void;
  selectedType: string | null;
}

export function OrnamentChooser({
  onSelect,
  selectedType,
}: OrnamentChooserProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {ORNAMENT_CHOICES.map((ornament) => (
        <button
          key={ornament.name}
          onClick={() => onSelect(ornament.name)}
          className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
            selectedType === ornament.name
              ? "border-blue-500 shadow-lg"
              : "border-transparent hover:border-blue-300"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 p-2">
            {/* Placeholder for image */}
            <div className="mb-2 h-16 w-16 rounded-full bg-gray-700">
              {/* Replace with actual image when available */}
              <img
                src={ornament.imageUrl}
                alt={ornament.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-center text-sm text-white">
              {ornament.name}
            </span>
            <span className="text-center text-xs text-white/60">
              {ornament.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
