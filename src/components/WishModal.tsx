import { useState } from "react";
import { DecorationChoice } from "../types";
import { OrnamentChooser } from "./OrnamentChooser";

const DECORATION_CHOICES: DecorationChoice[] = [
  { type: "bauble", label: "Bauble" },
  { type: "santa", label: "Santa" },
  // { type: "lights", label: "Lights", icon: lights, color: "#00ff00" },
];

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    type: DecorationChoice["type"],
    message: string,
    name: string
  ) => void;
}

export function WishModal({ isOpen, onClose, onConfirm }: WishModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<
    DecorationChoice["type"] | null
  >(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (!selectedType || !name.trim()) return;
    onConfirm(selectedType, message, name);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedColor("#ff0000");
    setMessage("");
    setName("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[800px] max-w-[95%] rounded-xl bg-stone-100/20 p-5 backdrop-blur-lg backdrop-filter">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl text-white">
            {step === 1 ? "Choose an Ornament" : "Add Your Message"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {step === 1 ? (
          <div className="h-full w-full space-y-4 overflow-scroll">
            <OrnamentChooser
              selectedType={selectedType}
              onSelect={(type) => {
                setSelectedType(type);
                setStep(2);
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-white">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-gray-700 p-2 text-white"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-white">
                Your Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl bg-gray-700 p-2 text-white"
                rows={4}
                placeholder="Write your wish or message..."
              />
            </div>
            {/* <div>
              <label className="mb-2 block text-white">Color</label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="h-10 w-full rounded"
              />
            </div> */}
            <div className="flex space-x-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded bg-gray-600 p-2 text-white hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={!name.trim()}
                className={`flex-1 rounded p-2 text-white ${
                  name.trim()
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "cursor-not-allowed bg-blue-400"
                }`}
              >
                Place on Tree
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
