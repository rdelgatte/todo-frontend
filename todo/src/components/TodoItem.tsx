import { useTodoItems, type TodoItem } from '../hooks/useTodoItems';

type Props = {
  todoItem: TodoItem;
};

export default function TodoItem({ todoItem }: Props) {
  const { updateTodoItemCompletion: toggleCompletion } = useTodoItems();

  return (
      <div className="flex items-center justify-between flex-col">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todoItem.todoItemCompleted}
            onChange={() => toggleCompletion.mutate({...todoItem, todoItemCompleted: !todoItem.todoItemCompleted})}
          />
          <span className={todoItem.todoItemCompleted ? 'line-through' : ''}>
            {todoItem.todoItemTitle}
          </span>
        </label>
        {todoItem.todoItemDescription && (
          <p className="text-sm text-gray-600">{todoItem.todoItemDescription}</p>
        )}
      </div>
  );
}
