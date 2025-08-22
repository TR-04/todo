import { useState } from 'react';
import { X } from 'lucide-react';

interface TodoPopupProps {
  isOpen: boolean;
  close: () => void;
  submit: (text: string) => void;
}



const TodoPopup = ({ isOpen, close, submit }: TodoPopupProps) => {

const [text, setText] = useState('');

if(!isOpen) return null; 

const handleSubmit = () => {
  if (text.trim()) {
    submit(text);
    setText('');
    close();
  }
};


  return (
    <div className='fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 flex flex-col'>
        <input
            className="focus:outline-none border-b border-black w-120"
            type="text"
            placeholder="New package"
            onChange={(e) => setText(e.target.value)}
          />

        <button className="cursor-pointer self-center mt-10 w-auto" onClick={handleSubmit}>
          create
        </button>

        <button className="cursor-pointer mt-5 flex self-center w-auto" onClick={close}>
          <X size={20}/>
        </button>
        
      </div>
      
    </div>
  );
};

export default TodoPopup