import { useEffect } from "react";
import { X } from 'lucide-react';


interface InfoPopupProps {
  isOpen: boolean;
  close: () => void;
}

const Info = ({isOpen, close}: InfoPopupProps) => {

  if (!isOpen) return null; 

  useEffect (() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    }

    if (isOpen) document.addEventListener('keyup', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }

  }, [isOpen, close]);

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">

      

      <div className="bg-white px-6 py-3 flex flex-col rounded-lg shadow-lg w-120 text-base">
        <span className='text-gray-600 mt-2 text-lg'>Shortcuts</span>
        
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
          className="cursor-pointer flex self-center w-auto text-gray-500 hover:text-gray-700 mt-5" 
          onClick={close}
        >
          <X size={20}/>
        </button>


        <div className="flex flex-row justify-center gap-1 text-xs mt-2">
          <a 
            href="https://vercel.com/tr-04s-projects"
            target="_blank"
            className="text-purple-500">Vercel
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
}

export default Info