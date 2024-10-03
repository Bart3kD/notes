import { useState, useEffect } from "react";
import { getNote, deleteTodo, editTitle, editText } from "@/back/actions/todoAction";

type TNote = {
  id: number;
  title: string;
  text: string;
};

export const useNote = (id: string | undefined) => {
  const [note, setNote] = useState<TNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const fetchedNote = await getNote(Number(id));
          if (fetchedNote) {
            setNote(fetchedNote);
            setTitle(fetchedNote.title);
            setText(fetchedNote.text);
          } else {
            setNote(null);
            setError("Note not found.");
          }
        } catch (err) {
          setError("Failed to fetch note.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note) return;

    try {
      await editTitle(note.id, title);
      await editText(note.id, text);
      setNote({ ...note, title, text });
      setEditing(false);
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteTodo(Number(id));
        return true;
      } catch (err) {
        setError("Failed to delete note.");
      }
    }
    return false;
  };

  const handleCancel = () => {
    setTitle(note?.title || "");
    setText(note?.text || "");
    setEditing(false);
  };

  return { note, loading, error, editing, setEditing, title, setTitle, text, setText, handleSave, handleCancel, handleDelete };
};