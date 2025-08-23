import { useEffect } from "react";
import { X } from "lucide-react";

interface InfoPopupProps {
  isOpen: boolean;
  close: () => void;
}

const Info = ({ isOpen, close }: InfoPopupProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (isOpen) document.addEventListener("keyup", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
      <div className="flex w-120 flex-col rounded-lg bg-white px-6 py-3 text-base shadow-lg">
        <span className="mt-2 text-lg text-gray-600">Shortcuts</span>

        <div className="flex justify-between">
          <span>Open create</span>
          <span>Shift + C</span>
        </div>

        <div className="flex justify-between">
          <span>Day Select</span>
          <span>1 ~ 8</span>
        </div>

        <div className="flex justify-between">
          <span>Quick Exit</span>
          <span>Esc</span>
        </div>

        <button
          className="mt-5 flex w-auto cursor-pointer self-center text-gray-500 hover:text-gray-700"
          onClick={close}
        >
          <X size={20} />
        </button>

        <div className="mt-2 flex flex-row justify-center gap-1 text-xs">
          <a
            href="https://vercel.com/tr-04s-projects"
            target="_blank"
            className="text-purple-500"
          >
            Vercel
          </a>
          &&
          <a
            href="https://github.com/TR-04"
            target="_blank"
            className="text-blue-500"
          >
            TR-04
          </a>
        </div>
      </div>
    </div>
  );
};

export default Info;
