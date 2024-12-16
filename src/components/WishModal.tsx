import { useState, useRef, useEffect } from "react";
import { DecorationChoice } from "../types";

const DECORATION_CHOICES: DecorationChoice[] = [
  { type: "bauble", label: "Red Bauble", color: "#ff0000" },
  { type: "bauble", label: "Blue Bauble", color: "#0000ff" },
  { type: "bauble", label: "Green Bauble", color: "#00ff00" },
  { type: "bauble", label: "Gold Bauble", color: "#ffd700" },
  { type: "bauble", label: "Silver Bauble", color: "#c0c0c0" },
  { type: "bauble", label: "Purple Bauble", color: "#800080" },
  { type: "bauble", label: "Pink Bauble", color: "#ff69b4" },
  { type: "bauble", label: "Orange Bauble", color: "#ffa500" },
  { type: "bauble", label: "Teal Bauble", color: "#008080" },
];

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    type: DecorationChoice["type"],
    message: string,
    color: string,
    name: string
  ) => void;
}

export function WishModal({ isOpen, onClose, onConfirm }: WishModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<
    DecorationChoice["type"] | null
  >(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");

  const handleConfirm = () => {
    if (!selectedType || !name.trim()) return;
    onConfirm(selectedType, message, color, name);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType(null);
    setMessage("");
    setName("");
    setColor("#ff0000");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-stone-100/20  backdrop-filter backdrop-blur-lg rounded-xl p-5 w-96 max-w-[95%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">
            {step === 1 ? "Choose Decoration" : "Add Your Message"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            {DECORATION_CHOICES.map((choice) => (
              <button
                key={choice.type}
                onClick={() => {
                  setSelectedType(choice.type);
                  setColor(choice.color);
                  setStep(2);
                }}
                className={`relative w-full p-4 overflow-hidden rounded-xl ${selectedType === choice.type ? "bg-blue-600" : "bg-gray-700"
                  } text-white hover:bg-blue-500 transition-colors`}
              >
                <img
                  className="absolute top-1/2 -translate-y-1/2 -left-5 h-[150%] object-contain opacity-50"
                  src={choice.icon}
                  alt={choice.label}
                />
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-xl bg-gray-700 text-white"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="text-white block mb-2">
                Your Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 rounded-xl bg-gray-700 text-white"
                rows={4}
                placeholder="Write your wish or message..."
              />
            </div>
            <div>
              <label className="text-white block mb-2">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={!name.trim()}
                className={`flex-1 p-2 text-white rounded ${name.trim()
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-400 cursor-not-allowed"
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
