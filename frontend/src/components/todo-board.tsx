import {
  PackagePlus,
  Package,
  PackageCheck,
  Send,
  Trash,
  FunnelPlus,
  ArrowDownUp,
  BookCheck,
  Flower2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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

  // Will only every call close once now memoisation
  const handleClose = useCallback(() => setIsPopupOpen(false), []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "All"];

  const [deliveredCount, setDeliveredCount] = useState(() => {
    const saved = localStorage.getItem("deliveredCount");
    return saved ? JSON.parse(saved) : 0;
  });

  // Stores all todos
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save delivered count whenever it changes
  useEffect(() => {
    localStorage.setItem("deliveredCount", deliveredCount.toString());
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
  const filteredTodos =
    selectedDay === "All"
      ? todos
      : todos.filter((todo) => todo.day === selectedDay);

  useEffect(() => {
    const hotkeys = (e: KeyboardEvent) => {
      const dayNum = parseInt(e.key);
      if (dayNum >= 1 && dayNum <= 8) {
        setSelectedDay(days[dayNum - 1]);
      }

      if (e.key === "C") {
        e.preventDefault();
        setIsPopupOpen(true);
      }
    };

    // Stop calling once popup is open otherwise, C becomes unavailable
    if (!isPopupOpen) document.addEventListener("keydown", hotkeys);

    return () => {
      document.removeEventListener("keydown", hotkeys);
    };
  }, [isPopupOpen]);

  return (
    <div className="font-geist mt-50 flex flex-col items-center">
      {/*Color of the day changes depending on how many tasks set in that day*/}
      <div className="mb-2 flex flex-row gap-7">
        {days.map((day) => (
          <div
            key={day}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-1 p-3 select-none ${
              selectedDay === day
                ? "border-blue-500 bg-blue-200 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-row text-8xl text-black select-none">
        {deliveredCount} delivered
      </div>

      {/*Implement these future features*/}
      <div className="flex flex-row gap-7 select-none">
        <button className="flex cursor-pointer flex-row gap-2 text-gray-400 line-through">
          Filter
          <FunnelPlus size={22} />
        </button>

        <button className="flex cursor-pointer flex-row gap-2 text-gray-400 line-through">
          Sort
          <ArrowDownUp size={22} />
        </button>

        <button className="flex cursor-pointer flex-row gap-2 text-gray-400 line-through">
          Calendar
          <BookCheck size={22} />
        </button>

        <button
          className="flex cursor-pointer flex-row gap-2"
          onClick={() => setIsPopupOpen(true)}
        >
          Create
          <PackagePlus size={22} />
        </button>
      </div>

      {/* Todo display */}
      <div className="flex h-auto w-auto flex-col items-center justify-center gap-5 pt-5">
        {filteredTodos.length === 0 ? (
          <div className="text-base text-gray-500">
            {selectedDay === "All" ? (
              <div className="mt-5 flex flex-row gap-1">
                {" "}
                Nothing here! <Flower2 />
              </div>
            ) : (
              <div className="mt-5 flex flex-row gap-1">
                {" "}
                Your {selectedDay} is free! <Flower2 />
              </div>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div className="flex flex-row" key={todo.id}>
              <div className="flex h-auto justify-center rounded-l-lg border-1 border-r-0 border-red-500 bg-red-200 px-2">
                <button
                  className="cursor-pointer text-red-700"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash size={16} />
                </button>
              </div>

              <div className="flex h-auto w-140 items-center justify-between rounded-r-lg border-1 border-black p-4 pr-5 pl-5">
                <div className="flex flex-row items-center gap-10">
                  <button
                    className={`cursor-pointer rounded-full border-1 p-1 ${todo.isFinished ? "border-green-500 bg-green-200" : ""}`}
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
                      className={`flex h-auto w-95 overflow-hidden ${todo.isFinished ? "text-gray-400 line-through" : ""}`}
                    >
                      {todo.text}
                    </div>
                    <div className="mt-1 flex gap-1 text-xs text-gray-500 select-none">
                      <span>{todo.day === "-" ? "" : todo.day}</span>
                      {todo.deadline && todo.day !== "-" && <span>•</span>}

                      {todo.deadline && (
                        <span>
                          {" "}
                          Due:{" "}
                          {new Date(todo.deadline).toLocaleDateString("en-GB")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className={`${todo.isFinished ? "cursor-pointer text-black transition-all duration-500 hover:rotate-45 hover:text-blue-500" : "cursor-default text-gray-200"}`}
                  onClick={() => sendTodo(todo.id)}
                >
                  <Send />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <TodoPopup
        isOpen={isPopupOpen}
        close={handleClose}
        submit={addTodoPopup}
        initialDay={selectedDay === "All" ? "-" : selectedDay}
      />
    </div>
  );
};

export default Todo;
