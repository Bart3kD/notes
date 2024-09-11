"use client";
import { FC, useState } from "react";
import { todoType } from "../../back/types/todoType";
import Todo from "./todo";
import AddTodo from "./addTodo";
import {
  addTodo,
  deleteTodo,
  editText,
  editTitle,
  getLatestId,
} from "../../back/actions/todoAction";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  const createTodo = async (title: string, text: string) => {
    const latestId = await getLatestId();
    console.log(latestId);
    const id = latestId !== null ? latestId + 1 : 1;
    await addTodo(id, title, text);
    setTodoItems((prev) => [...prev, { id, title, text, done: false }]);
  };

  const changeTodoTitle = (id: number, title: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
    editTitle(id, title);
  };

  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editText(id, text);
  };

  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoTitle={changeTodoTitle}
            changeTodoText={changeTodoText}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      <AddTodo createTodo={createTodo} />
    </main>
  );
};

export default Todos;
