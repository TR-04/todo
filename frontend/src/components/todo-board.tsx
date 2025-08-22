import { PackagePlus, Package, PackageCheck, Send, Trash, FunnelPlus, ArrowDownUp, CircleOff, BookCheck } from "lucide-react";
import { useState, useEffect } from "react";
import TodoPopup from "./todo-popup";

interface Todo {
  id: number;
  text: string;
  isFinished: boolean;
}

const Todo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [deliveredCount, setDeliveredCount] = useState(() => {
    const saved = localStorage.getItem('deliveredCount');
    return saved ? JSON.parse(saved) : 0;
  });

  // Stpres all todos
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];

  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save delivered count whenever it changes
  useEffect(() => {
    localStorage.setItem('deliveredCount', deliveredCount.toString());
  }, [deliveredCount]);

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

  // const HandleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     addTodoPopup();
  //   }
  // };

  const addTodoPopup = (text: string) => {
    // Check input is not blank
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text,
        isFinished: false,
      };
      setTodos([...todos, newTodo]);
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
      <div className="text-8xl text-black mb-5 flex flex-row">
        {deliveredCount} delivered
      </div>

      <div className="flex flex-row gap-7">
        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Filter
          <FunnelPlus size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Sort
          <ArrowDownUp size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Cancelled
          <CircleOff size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Finished
          <BookCheck size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Create
          <PackagePlus size={22} />
        </button>
      </div>

      <div className="flex flex-col justify-center gap-5 h-auto pt-5 w-auto items-center">
        {todos.map((todo) => (
          <div className="flex flex-row">
            <div className="flex justify-center px-2 h-auto border-1 border-r-0 rounded-l-lg bg-red-200 border-red-500">
              <button
                className="cursor-pointer text-red-700"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash size={16} />
              </button>
            </div>

            <div
              key={todo.id}
              className="rounded-r-lg border-black border-1 flex items-center w-140 h-auto p-4 justify-between pl-5 pr-5"
            >
              <div className="flex-row flex items-center gap-10">
                <button
                  className={`cursor-pointer rounded-full border-1 p-1 transition-all duration-300 ${todo.isFinished ? "bg-green-200 border-green-500" : ""}`}
                  onClick={() => toggleFinish(todo.id)}
                >
                  {todo.isFinished ? (
                    <PackageCheck className="text-green-500" />
                  ) : (
                    <Package />
                  )}
                </button>

                <div
                  className={`flex w-95 overflow-hidden h-auto ${todo.isFinished ? "line-through text-gray-400" : ""}`}
                >
                  {todo.text}
                </div>
              </div>

              <button
                className={`${todo.isFinished ? "text-black cursor-pointer hover:rotate-45 hover:text-blue-500 duration-500 transition-all" : "text-gray-200 cursor-default"}`}
                onClick={() => sendTodo(todo.id)}
              >
                <Send />
              </button>
            </div>
          </div>
        ))}
      </div>

      <TodoPopup
        isOpen={isPopupOpen}
        close={()=>setIsPopupOpen(false)}
        submit={addTodoPopup}
      />


    </div>
  );
};

export default Todo;
