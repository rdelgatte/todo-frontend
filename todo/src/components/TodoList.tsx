import { useState } from 'react';
import { useTodoItems, type TodoItem } from '../hooks/useTodoItems';
import Item from './TodoItem';

export default function TodoList() {
  const { todoItems, isLoading, isError } = useTodoItems();
  const [showCompleted, setShowCompleted] = useState(true);
  
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;
  
  return (
      <div className="flex center gap-2 mb-4 flex-col">
      <button onClick={() => toggleShowCompleted()}>{showCompleted ? 'Pending tasks only' : 'Show all tasks'}</button>
        { todoItems
            .filter((item) => showCompleted ? true : !item.todoItemCompleted)
            .map((item: TodoItem)=> (<Item key={item.todoItemIdentifier} todoItem={item}/>)) 
        }
      </div>
  );
}
