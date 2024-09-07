"use client";

import { useState, FC } from "react";
import { useRouter } from "next/navigation";
import { todoType } from "../../back/types/todoType";

interface Props {
  titles: Pick<todoType, "id" | "title">[];
}

const NotesDropdown: FC<Props> = ({ titles }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSelectChange = (id: number) => {
    setSelectedNoteId(id);
    setIsDropdownOpen(false);
  };

  const handleOpenNote = () => {
    if (selectedNoteId) {
      router.push(`/notes/${selectedNoteId}`);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center bg-[#282828] text-white">
      <div className="relative w-64">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-gray-500 flex justify-between items-center"
        >
          {selectedNoteId
            ? titles.find((title) => title.id === selectedNoteId)?.title
            : "Select a note"}
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {titles.map((title) => (
              <div
                key={title.id}
                onClick={() => handleSelectChange(title.id)}
                className="cursor-pointer p-2 hover:bg-gray-600 transition duration-200"
              >
                {title.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleOpenNote}
        disabled={!selectedNoteId}
        className={`w-64 p-2 rounded-md font-semibold ${
          selectedNoteId
            ? "bg-blue-600 hover:bg-blue-700 transition duration-300"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Open
      </button>
    </div>
  );
};

export default NotesDropdown;
