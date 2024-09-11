"use client"
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    addTodo,
    getLatestId,
} from "../../back/actions/todoAction";

import HomeButton from "../components/homeButton";

const Page = () => {
    const router = useRouter();

    const [title, setTitle] = useState("");

    const createTodo = async (title: string, text: string) => {
        const latestId = await getLatestId();
        console.log(latestId);
        const id = latestId !== null ? latestId + 1 : 1;
        await addTodo(id, title, text);
        return id;
    };

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleAdd = async () => {
        const noteId = await createTodo(title, "");
        setTitle("");
        router.push(`/notes/${noteId}`);
    };

    return (
        <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
            <HomeButton/>
            <input
                type="text"
                className="w-80 px-2 py-1 border border-gray-200 rounded outline-none text-black"
                placeholder="Title"
                onChange={handleTitle}
                value={title}
            />
            <button
                className="flex w-80 items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
                onClick={handleAdd}
            >
                Add
            </button>
        </div>
    );
}

export default Page;
