"use client";

import { useState, FC } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in App Router
import { todoType } from "../../back/types/todoType"; // Adjust this import based on your type

interface Props {
  titles: Pick<todoType, "id" | "title">[];
}

const NotesDropdown: FC<Props> = ({ titles }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const router = useRouter(); // useRouter for navigation

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNoteId(Number(e.target.value)); // Set the selected note's ID
  };

  const handleOpenNote = () => {
    if (selectedNoteId) {
      router.push(`/note/${selectedNoteId}`); // Navigate to /note/[id]
    }
  };

  return (
    <div>
      <select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>Select a note</option>
        {titles.map((title) => (
          <option key={title.id} value={title.id}>
            {title.title}
          </option>
        ))}
      </select>
      <button onClick={handleOpenNote} disabled={!selectedNoteId}>
        Open
      </button>
    </div>
  );
};

export default NotesDropdown;
