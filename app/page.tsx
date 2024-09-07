import { getTitles } from "@/back/actions/todoAction";
import NotesDropdown from "./components/notesDropdown";
import HomeButton from "./components/homeButton";
import CreateButton from "./components/createButton";
export default async function Home() {
  const titles = await getTitles();

  return (
    <div>
      <HomeButton/>
      <CreateButton/>
      <NotesDropdown titles={titles} />
    </div>
  );
}
