import React from "react";
import { Decoration } from "../types";

interface WishesPanelProps extends PanelControlProps {
  decorations: Decoration[];
  handleExportData: () => void;
  isPanelOpen: boolean;
}

interface PanelControlProps {
  setIsPanelOpen: (x: boolean) => void;
  isPanelOpen: boolean;
}

const MobileButton: React.FC<PanelControlProps> = ({
  setIsPanelOpen,
  isPanelOpen,
}) => {
  return (
    <button
      onClick={() => setIsPanelOpen(!isPanelOpen)}
      className="fixed left-4 top-4 z-50 rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm md:hidden"
    >
      {isPanelOpen ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
};
const WishesPanel: React.FC<WishesPanelProps> = ({
  decorations,
  handleExportData,
  isPanelOpen,
  setIsPanelOpen,
}) => {
  return (
    <>
      <MobileButton setIsPanelOpen={setIsPanelOpen} isPanelOpen={isPanelOpen} />
      <div
        className={`fixed top-0 z-40 h-full w-80 overflow-y-auto bg-white/80 shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out md:translate-x-0 ${isPanelOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Wishes</h2>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Data
            </button>
          </div>
          <div className="space-y-4">
            {decorations
              .filter((deco) => deco.message !== "")
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((decoration) => (
                <div
                  key={decoration.id}
                  className="rounded-lg bg-white/80 p-4 shadow-sm transition-shadow hover:shadow-md"
                  style={{ borderLeft: `4px solid ${decoration.color}` }}
                >
                  <p className="text-gray-800">{decoration.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600">
                      - {decoration.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(decoration.createdAt).toLocaleDateString()}{" "}
                      {new Date(decoration.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishesPanel;
