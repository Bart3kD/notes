"use client"
import { useEffect, useState } from "react";
import { getTitles } from "@/back/actions/todoAction";
import NotesDropdown from "./components/notesDropdown";
import HomeButton from "./components/homeButton";
import CreateButton from "./components/createButton";
import { todoType } from "@/back/types/todoType";

export default function Home() {
  const [titles, setTitles] = useState<Pick<todoType, "id" | "title">[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titlesData = await getTitles();
        setTitles(titlesData);
      } catch (error) {
        console.error("Error fetching titles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HomeButton />
      <CreateButton />
      <NotesDropdown titles={titles} />
    </div>
  );
}
