import { useRouter } from "next/router";
import { getNote } from "@/back/actions/todoAction";

export default async function NotePage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch the note based on the ID
  if (!id) return <div>Loading...</div>;

  const note = await getNote(Number(id));

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.text}</p>
    </div>
  );
}
