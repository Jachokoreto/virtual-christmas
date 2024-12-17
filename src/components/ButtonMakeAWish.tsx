import React from "react";

interface ButtonMakeAWishProps {
  isPlacingDecoration: boolean;
  handleAddWish: () => void;
}

export const ButtonMakeAWish: React.FC<ButtonMakeAWishProps> = ({
  isPlacingDecoration,
  handleAddWish,
}) => {
  return (
    <button
      className={`absolute bottom-8 left-1/2 z-50 -translate-x-1/2 transform rounded-full border-4 border-white px-8 py-4 opacity-80 backdrop-blur-md ${
        isPlacingDecoration
          ? "bg-red-700 hover:bg-red-800"
          : "bg-red-500 hover:bg-red-600"
      } flex items-center justify-center gap-2 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:shadow-xl`}
      onClick={handleAddWish}
      disabled={isPlacingDecoration}
      aria-label={
        isPlacingDecoration ? "Click on tree to place" : "Make a wish"
      }
    >
      {isPlacingDecoration ? (
        <>
          <span className="w-[220px] animate-pulse">
            Click on tree to place
          </span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </>
      ) : (
        <>
          <span>Make a wish</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </>
      )}
    </button>
  );
};
