"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (title: string, value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [title, setTitle] = useState("")
  const [input, setInput] = useState("");

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(title, input);
    setInput("");
  };

  return (
    <div className="w-full flex gap-1 mt-2">
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none text-black"
        placeholder="Title"
        onChange={handleTitle}
        value={title}
      />
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none text-black"
        placeholder="Text"
        onChange={handleInput}
        value={input}
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