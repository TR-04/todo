import { PackagePlus, Package, PackageCheck, Send, Trash, FunnelPlus, ArrowDownUp, BookCheck } from "lucide-react";
import { useState, useEffect } from "react";
import TodoPopup from "./todo-popup";

interface Todo {
  id: number;
  text: string;
  isFinished: boolean;
  day: string;
  deadline: string;
}

const Todo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("All");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [deliveredCount, setDeliveredCount] = useState(() => {
    const saved = localStorage.getItem('deliveredCount');
    return saved ? JSON.parse(saved) : 0;
  });

  // Stores all todos
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

  const addTodoPopup = (text: string, day: string, deadline: string) => {
    // Check input is not blank
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text,
        isFinished: false,
        day: day,
        deadline: deadline,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sendTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo && todo.isFinished) {
      addDelivery();
      deleteTodo(id);
    }
  };

  // Filter todos based on selected day
  const filteredTodos = selectedDay === "All" 
    ? todos 
    : todos.filter(todo => todo.day === selectedDay);
  
  return (
    <div className="font-geist flex flex-col items-center mt-50">

      {/*Color of the day changes depending on how many tasks set in that day*/}
      <div className="flex flex-row gap-7">
        {days.map((day) => (
          <div 
            key={day}
            className={`flex rounded-full border-1 p-3 h-10 w-10 justify-center items-center cursor-pointer select-none ${
              selectedDay === day 
                ? "bg-blue-200 border-blue-500 text-blue-700" 
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
        <div 
          className={`flex rounded-full border-1 p-3 h-10 w-10 justify-center items-center cursor-pointer select-none ${
            selectedDay === "All" 
              ? "bg-blue-200 border-blue-500 text-blue-700" 
              : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedDay("All")}
        >
          All
        </div>
      </div>
      
      <div className="text-8xl text-black mb-5 flex flex-row select-none">
        {deliveredCount} delivered
      </div>

      {/*Implement these future features*/}
      <div className="flex flex-row gap-7 select-none">
        <button className="cursor-pointer flex flex-row gap-2 text-gray-400 line-through">
          Filter
          <FunnelPlus size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2 text-gray-400 line-through">
          Sort
          <ArrowDownUp size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2 text-gray-400 line-through">
          Calendar
          <BookCheck size={22} />
        </button>

        <button className="cursor-pointer flex flex-row gap-2" onClick={() => setIsPopupOpen(true)}>
          Create
          <PackagePlus size={22} />
        </button>
      </div>

      <div className="flex flex-col justify-center gap-5 h-auto pt-5 w-auto items-center">
        {filteredTodos.map((todo) => (
          <div className="flex flex-row" key={todo.id}>
            <div className="flex justify-center px-2 h-auto border-1 border-r-0 rounded-l-lg bg-red-200 border-red-500">
              <button
                className="cursor-pointer text-red-700"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash size={16} />
              </button>
            </div>

            <div className="rounded-r-lg border-black border-1 flex items-center w-140 h-auto p-4 justify-between pl-5 pr-5">
              <div className="flex-row flex items-center gap-10">
                <button
                  className={`cursor-pointer rounded-full border-1 p-1 ${todo.isFinished ? "bg-green-200 border-green-500" : ""}`}
                  onClick={() => toggleFinish(todo.id)}
                >
                  {todo.isFinished ? (
                    <PackageCheck className="text-green-500" />
                  ) : (
                    <Package />
                  )}
                </button>

                <div className="flex flex-col">
                  <div
                    className={`flex w-95 overflow-hidden h-auto ${todo.isFinished ? "line-through text-gray-400" : ""}`}
                  >
                    {todo.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 select-none flex gap-2">
                    <span>{todo.day}</span>
                    {todo.deadline && <span>•</span>}

                    {todo.deadline && <span> Due: {new Date(todo.deadline).toLocaleDateString('en-GB')}</span>}
                  </div>
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
        close={() => setIsPopupOpen(false)}
        submit={addTodoPopup}
        initialDay={selectedDay === "All" ? "Mon" : selectedDay}
      />

    </div>
  );
};

export default Todo;