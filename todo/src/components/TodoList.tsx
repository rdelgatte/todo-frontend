import { useEffect, useState } from "react";
import { EditTodoItem } from "./EditTodoItem";
import type { TodoItem } from "../model/TodoItem.type";
import { useTodoItems } from "../hooks/useTodoItems";

export default function TodoList() {
  const {
    todoItems,
    isLoading,
    isError,
    updateTodoItemCompletion,
    deleteTodoItem,
    updateTodoItem,
  } = useTodoItems();
  const [showCompleted, setShowCompleted] = useState(true);
  const [editedItems, setEditedItems] = useState<{ [key: number]: TodoItem }>(
    {},
  );

  useEffect(() => {
    const initialEditedItems = todoItems.reduce(
      (acc, item) => {
        acc[item.todoItemIdentifier] = item;
        return acc;
      },
      {} as { [key: number]: TodoItem },
    );
    setEditedItems(initialEditedItems);
  }, [todoItems]);

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleEdit = (id: number, field: keyof TodoItem, value: string) => {
    setEditedItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const toggleCompletion = (id: number) => {
    const item = todoItems.find((item) => item.todoItemIdentifier === id);
    if (!item) return;
    const updatedItem: TodoItem = {
      ...item,
      todoItemCompleted: !item.todoItemCompleted,
    };
    updateTodoItemCompletion.mutate(updatedItem);
  };

  const handleDelete = (id: number) => {
    deleteTodoItem.mutate(id);
  };

  const handleSave = (id: number) => {
    const item = editedItems[id];
    if (!item) return;
    updateTodoItem.mutate({ ...item, todoItemIdentifier: id });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;

  return (
    <div className="m-4">
      <table className="mt-4 w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="w-2l border border-gray-300 px-4 py-2 text-indigo-800">
              <button
                className="bg-blue-500 px-2 py-1 text-indigo-800"
                onClick={toggleShowCompleted}
              >
                {showCompleted ? "Show pending" : "Show All"}
              </button>
            </th>
            <th className="border border-gray-300 px-4 py-2 text-indigo-800">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-indigo-800">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-indigo-800">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {Object.values(editedItems)
            .filter((item) => (showCompleted ? true : !item.todoItemCompleted))
            .sort((a, b) => b.todoItemIdentifier - a.todoItemIdentifier)
            .map((item: TodoItem) => (
              <EditTodoItem
                key={item.todoItemIdentifier}
                todoItem={item}
                handleEdit={handleEdit}
                toggleCompletion={toggleCompletion}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
