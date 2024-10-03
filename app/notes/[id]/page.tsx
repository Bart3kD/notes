"use client";

import { useRouter, usePathname } from "next/navigation";
import { useNote } from "@/hooks/useNote";
import SaveButton from "@/app/components/saveButton";
import CancelButton from "@/app/components/cancelButton";
import EditButton from "@/app/components/editButton";
import HomeButton from "@/app/components/homeButton";
import DeleteButton from "@/app/components/deleteButton";

export default function NotePage() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();
  const { note, loading, error, editing, setEditing, title, setTitle, text, setText, handleSave, handleCancel, handleDelete } = useNote(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!note) return <div>Note not found.</div>;

  const onDelete = async () => {
    const isDeleted = await handleDelete();
    if (isDeleted) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col w-2/3 h-screen bg-bgColor mx-auto py-20">
      <HomeButton />
      {!editing ? (
        <>
          <h1 className="text-5xl pb-5">{title}</h1>
          <p className="text-xl pl-1 mt-6 whitespace-pre-wrap">{text}</p>
          <EditButton onClick={() => setEditing(true)} />
        </>
      ) : (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-5xl pb-5 bg-bgColor"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-xl pl-1 h-full mt-5 bg-bgColor"
          />
          <SaveButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </>
      )}
      <DeleteButton onClick={onDelete} />
    </div>
  );
}