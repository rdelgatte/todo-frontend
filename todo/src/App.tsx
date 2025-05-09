import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./components/TodoList.tsx";
import "./App.css";
import { AddTodoItem } from "./components/AddTodoItem.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex-col items-center justify-center">
        <AddTodoItem />
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}
