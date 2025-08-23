import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TodoPopupProps {
  isOpen: boolean;
  close: () => void;
  submit: (text: string, day: string, deadline: string) => void;
  initialDay: string;
}

const TodoPopup = ({ isOpen, close, submit, initialDay }: TodoPopupProps) => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const todoInputRef = useRef<HTMLInputElement>(null);

  // To prevent reinitialisation, the value does not change from the first mount
  // It mounts first, then when we open up the create menu it stays as this value forever
  // So we need to update initial day whenever we open creat, thus, we use useeffect
  const [selectedDay, setSelectedDay] = useState(initialDay);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "-"];

  // Update our selected day everytime initial day changes
  // since the component only mounts once (we always use starting
  // value when first mounted in this case)
  useEffect(() => {
    setSelectedDay(initialDay);
  }, [initialDay]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      submit(text, selectedDay, deadline);
      setText("");
      setTimeout(() => todoInputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg">
        <input
          ref={todoInputRef}
          className="mb-4 w-120 border-b border-black focus:outline-none"
          type="text"
          placeholder="New package"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          onKeyDown={(e) => handleEnter(e)}
        />

        <span className="mt-2 text-sm text-gray-600">Due</span>
        <input
          className="mb-6 w-120 border-b border-black text-sm focus:outline-none"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="mb-6">
          <span className="mt-2 text-sm text-gray-600">Day</span>
          <div className="flex flex-row flex-wrap justify-center gap-3">
            {days.map((day) => (
              <div
                key={day}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-1 p-2 text-sm select-none ${
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
        </div>

        <button
          className="mb-3 cursor-pointer self-center transition-colors hover:text-blue-600"
          onClick={handleSubmit}
        >
          create
        </button>

        <button
          className="flex w-auto cursor-pointer self-center text-gray-500 hover:text-gray-700"
          onClick={close}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoPopup;
