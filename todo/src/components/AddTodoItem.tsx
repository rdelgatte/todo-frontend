import React, { useState } from "react";
import { useTodoItems } from "../hooks/useTodoItems";

interface AddTodoItemProps {
  onSuccess?: () => void;
}

export const AddTodoItem: React.FC<AddTodoItemProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const { addTodoItem, isError } = useTodoItems();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodoItem.mutate({ title }, { onSuccess });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit(event);
      setTitle("");
    }
    if (event.key === "Escape") {
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4">
      <input
        id="title"
        value={title}
        type="text"
        required
        placeholder="Create a new todo item"
        className="w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        onKeyDown={handleKeyDown}
        onChange={(event) => setTitle(event.target.value)}
        aria-description="Todo item title"
        aria-label="Todo item title"
        aria-required="true"
        aria-invalid={isError ? "true" : "false"}
        autoFocus
      />
      {isError && (
        <p className="text-sm text-red-500">Failed to save. Try again.</p>
      )}
    </form>
  );
};
