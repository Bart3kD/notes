"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getNote } from "@/back/actions/todoAction";

type TNote = {
  id: number;
  title: string;
  text: string;
};

export default function NotePage() {
  const [note, setNote] = useState<TNote | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        const fetchedNote = await getNote(Number(id));
        setNote(fetchedNote);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!note) return <div>Note not found.</div>;

  return (
    <div>
      <h1>{note.title}</h1> {/* TypeScript now knows note is of type Note */}
      <p>{note.text}</p>
    </div>
  );
}
