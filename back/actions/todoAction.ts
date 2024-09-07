"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/back/db/drizzle";
import { todo } from "@/back/db/schema";

export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

export const getLatestId = async () => {
  const allIds = await db
    .select({
      id: todo.id,
    })
    .from(todo);

  if (allIds.length === 0) {
    return null;
  }

  const latestId = Math.max(...allIds.map((item) => item.id));

  return latestId;
};

export const addTodo = async (id: number, title: string, text: string) => {
  try {
    await db.insert(todo).values({
      id: id,
      title: title,
      text: text,
    });
    console.log("Todo added successfully");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));

  revalidatePath("/");
};

export const editTitle = async (id: number, title: string) => {
  await db
    .update(todo)
    .set({
      title: title,
    })
    .where(eq(todo.id, id));

  revalidatePath("/");
};

export const editText = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));

  revalidatePath("/");
};

export const getTitles = async () => {
  const data = await db
    .select({
      id: todo.id,
      title: todo.title,
    })
    .from(todo);

  return data;
};

export const getNote = async (id: number) => {
  const data = await db
    .select({
      id: todo.id,
      title: todo.title,
      text: todo.text,
    })
    .from(todo)
    .where(eq(todo.id, id));

  return data[0];
};
