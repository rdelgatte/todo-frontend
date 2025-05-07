import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000/items';
const QUERY_KEY = 'items'

export type TodoItem = {
  todoItemIdentifier: number;
  todoItemTitle: string;
  todoItemDescription?: string;
  todoItemCompleted: boolean;
};

export const useTodoItems = () => {
  const queryClient = useQueryClient();

  const { data: todoItems = [], ...query } = useQuery<TodoItem[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${API_URL}`);
      if (!response.ok){
        throw new Error('Network error')
      }
      return response.json();
    }, 
    retry: 1
  });

  const addTodoItem = useMutation({
    mutationFn: async (newTodo: Omit<TodoItem, 'id'>) => {
      const response = await fetch(API_URL,{
        method: "POST",
        body: JSON.stringify({ todoItemTitle: newTodo.todoItemTitle, todoItemDescription: newTodo.todoItemDescription})
      });
      if (!response.ok){
        throw new Error('Network error')
      }
      return response.json();

    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
  });

  const updateTodoItemCompletion = useMutation({
    mutationFn: async (todo: TodoItem) => {
      await fetch(`${API_URL}/${todo.todoItemIdentifier}/complete`, {method: 'PATCH', body: JSON.stringify(todo.todoItemCompleted)});
      return todo;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
  });

  return {
    todoItems,
    ...query,
    addTodo: addTodoItem,
    updateTodoItemCompletion,
  };
};
