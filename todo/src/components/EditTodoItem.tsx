// components/EditTodoForm.tsx
import React from "react";
import type { TodoItem } from "../model/TodoItem.type";

interface Props {
  todoItem: TodoItem;
  handleEdit: (id: number, field: keyof TodoItem, value: string) => void;
  handleSave: (id: number) => void;
  toggleCompletion: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const EditTodoItem: React.FC<Props> = ({
  todoItem,
  handleEdit,
  toggleCompletion,
  handleDelete,
  handleSave: saveChanges,
}) => (
  <tr
    key={todoItem.identifier}
    className={todoItem.completed ? "bg-gray-200" : ""}
  >
    <td className="border border-gray-300 px-4 py-2 text-center">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={() => toggleCompletion(todoItem.identifier)}
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-indigo-800 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </td>
    <td className="border border-gray-300 px-4 py-2">
      <input
        type="text"
        value={todoItem.title}
        disabled={todoItem.completed}
        onChange={(e) =>
          handleEdit(todoItem.identifier, "title", e.target.value)
        }
        onBlur={() => saveChanges(todoItem.identifier)}
        className="w-full border border-gray-300 px-2 py-1"
      />
    </td>
    <td className="border border-gray-300 px-4 py-2">
      <input
        type="text"
        value={todoItem.description || ""}
        disabled={todoItem.completed}
        onChange={(e) =>
          handleEdit(todoItem.identifier, "description", e.target.value)
        }
        onBlur={() => saveChanges(todoItem.identifier)}
        className="w-full border border-gray-300 px-2 py-1"
      />
    </td>
    <td className="text-center">
      <button
        onClick={() => handleDelete(todoItem.identifier)}
        className="m-2 rounded bg-blue-500 text-indigo-800 hover:bg-blue-700"
      >
        Delete
      </button>
    </td>
  </tr>
);
