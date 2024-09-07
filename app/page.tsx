import { getTitles, getData } from "@/back/actions/todoAction";
import Todos from "./components/todos";
import NotesDropdown from "./components/notesDropdown";

export default async function Home() {
  const todos = await getData();
  const titles = await getTitles();

  return (
    <div>
      {/* Pass titles to the dropdown */}
      <NotesDropdown titles={titles} />
      <Todos todos={todos} />
    </div>
  );
}
