"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getNote, deleteTodo, editTitle, editText } from "@/back/actions/todoAction";
import HomeButton from "@/app/components/homeButton";

type TNote = {
  id: number;
  title: string;
  text: string;
};

export default function NotePage() {
  const [note, setNote] = useState<TNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalText, setOriginalText] = useState(""); 
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const fetchedNote = await getNote(Number(id));
          if (fetchedNote) {
            setNote(fetchedNote);
            setTitle(fetchedNote.title);
            setText(fetchedNote.text);
            setOriginalTitle(fetchedNote.title); 
            setOriginalText(fetchedNote.text); 
          } else {
            setNote(null);
          }
        } catch (error) {
          console.error("Failed to fetch note:", error);
          setNote(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      if (confirm("Are you sure you want to delete this note?")) {
        await deleteTodo(Number(id));
        router.push("/");
      }
    }
  };

  const changeTodoTitle = async (id: number, title: string) => {
    setNote((prevNote) => {
      if (prevNote && prevNote.id === id) {
        return { ...prevNote, title };
      }
      return prevNote;
    });
    await editTitle(id, title);
  };

  const changeTodoText = async (id: number, text: string) => {
    setNote((prevNote) => {
      if (prevNote && prevNote.id === id) {
        return { ...prevNote, text };
      }
      return prevNote;
    });
    await editText(id, text);
  };

  const handleSave = async () => {
    if (note) {
      await changeTodoTitle(note.id, title);
      await changeTodoText(note.id, text);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(originalTitle);
    setText(originalText); 
    setEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!note) return <div>Note not found.</div>;

  return (
    <div className="flex flex-col w-2/3 h-screen bg-bgColor mx-auto py-20">
      <HomeButton />
      {!editing ? (
        <>
          <h1 className="text-5xl pb-5">{title}</h1>
          <p className="text-xl pl-1">{text}</p>
          <button 
            onClick={() => setEditing(true)} 
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Edit Note
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-5xl pb-5"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-xl pl-1"
          />
          <button 
            onClick={handleSave} 
            className="mt-5 bg-green-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
          <button 
            onClick={handleCancel} 
            className="mt-5 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </>
      )}
      <button 
        onClick={handleDelete} 
        className="mt-10 bg-red-500 text-white py-2 px-4 rounded"
      >
        Delete Note
      </button>
    </div>
  );
}
