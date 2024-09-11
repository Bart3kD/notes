"use client";

import { FC, MouseEventHandler } from "react";

interface SaveButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SaveButton: FC<SaveButtonProps> = ({ onClick }) => {

  return (
    <div className="absolute top-20 right-80">
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
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <span className="sr-only">Home</span>
      </button>
    </div>
  );
};

export default SaveButton;
