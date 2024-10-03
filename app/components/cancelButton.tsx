"use client";

import { FC, MouseEventHandler } from "react";

interface CancelButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CancelButton: FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute top-5 right-20">
      <button
        onClick={onClick}
        className="flex items-center justify-center p-3 rounded-md bg-bgColor text-white hover:bg-gray-700 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <span className="sr-only">Home</span>
      </button>
    </div>
  );
};

export default CancelButton;
