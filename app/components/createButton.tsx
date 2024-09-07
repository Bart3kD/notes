"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

const CreateButton: FC = () => {
  const router = useRouter();

  const navigateHome = () => {
    router.push("/create");
  };

  return (
    <div className="absolute top-5 left-20">
      <button
        onClick={navigateHome}
        className="flex items-center justify-center p-3 rounded-md bg-bgColor text-white hover:bg-gray-700 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Home</span>
      </button>
    </div>
  );
};

export default CreateButton;
