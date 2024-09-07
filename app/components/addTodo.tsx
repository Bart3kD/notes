"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (title: string, text: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(title, text);
    setTitle("");
    setText("");
  };

  return (
    <div className="w-full flex gap-1 mt-2">
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        placeholder="Title"
        onChange={handleTitle}
        value={title}
      />
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        placeholder="Text"
        onChange={handleText}
        value={text}
      />
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;