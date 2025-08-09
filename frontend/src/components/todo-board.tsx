import { PackagePlus, Package, PackageCheck, Send, Trash } from "lucide-react";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  isFinished: boolean;
}

const Todo = () => {
  const [deliveredCount, setDeliveredCount] = useState(0);

  // Stores current input (our todo)
  const [inputText, setInputText] = useState("");

  // Stpres all todos
  const [todos, setTodos] = useState<Todo[]>([]);

  const addDelivery = () => {
    setDeliveredCount(deliveredCount + 1);
  };

  // Sets status of todo
  const toggleFinish = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo,
      ),
    );
  };

  const HandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    // Check input is not blank
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        isFinished: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todos) => todos.id !== id));
  };

  const sendTodo = (id: number) => {
    const todo = todos.find((todos) => todos.id === id);
    if (todo && todo.isFinished) {
      addDelivery();
      deleteTodo(id);
    }
  };

  return (
    <div className="font-geist flex flex-col items-center mt-50">
      <div className="text-8xl text-black mb-10 flex flex-row">
        {deliveredCount} delivered
      </div>

      <div className="flex flex-row gap-5">
        <search className="">
          <input
            className="focus:outline-none border-b border-black w-120"
            type="text"
            placeholder="New package"
            value={inputText}
            onKeyDown={HandleKeyDown}
            onChange={(e) => setInputText(e.target.value)}
          />
        </search>
        <button className="cursor-pointer" onClick={addTodo}>
          <PackagePlus />
        </button>
      </div>

      <div className="flex flex-col justify-center gap-5 h-auto pt-5 w-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-lg border-black border-1 flex items-center w-140 h-auto p-4 justify-between pl-5 pr-5"
          >
            <div className="flex-row flex items-center gap-10">
              <button
                className="cursor-pointer rounded-full border-1 p-1"
                onClick={() => toggleFinish(todo.id)}
              >
                {todo.isFinished ? <PackageCheck /> : <Package />}
              </button>

              <div
                className={`flex w-auto ${todo.isFinished ? "line-through text-gray-400" : ""}`}
              >
                {todo.text}
              </div>
            </div>

            <button
              className={`${todo.isFinished ? "text-black cursor-pointer" : "text-gray-200 cursor-default"}`}
              onClick={() => sendTodo(todo.id)}
            >
              <Send />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
