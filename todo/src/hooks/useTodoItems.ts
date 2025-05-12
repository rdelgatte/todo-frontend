import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoItem } from "../model/TodoItem.type";

const API_URL = "http://localhost:3000/items";
const QUERY_KEY = "items";

export const useTodoItems = () => {
  const queryClient = useQueryClient();

  const { data: todoItems = [], ...query } = useQuery<TodoItem[]>({
    queryKey: [QUERY_KEY],
    queryFn: async (): Promise<TodoItem[]> => {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json() as Promise<TodoItem[]>;
    },
  });

  const addTodoItem = useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description?: string;
    }) => {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  const updateTodoItemCompletion = useMutation({
    mutationFn: async (todo: TodoItem) => {
      await fetch(`${API_URL}/${todo.identifier}/complete`, {
        method: "PATCH",
        body: JSON.stringify(todo.completed),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  const deleteTodoItem = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  const updateTodoItem = useMutation({
    mutationFn: async (todoItem: TodoItem) => {
      await fetch(`${API_URL}/${todoItem.identifier}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: todoItem.title,
          description: todoItem.description,
        }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  return {
    todoItems,
    ...query,
    addTodoItem,
    updateTodoItemCompletion,
    deleteTodoItem,
    updateTodoItem,
  };
};
