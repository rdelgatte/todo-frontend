import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import TodoList from './components/TodoList.tsx'
import './App.css'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  )
}