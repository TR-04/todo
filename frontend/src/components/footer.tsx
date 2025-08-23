import { CodeXml } from "lucide-react";
import { useState, useCallback } from "react";
import InfoPopup from "./info-popup";

const Footer = () => {
  const[infoIsOpen, setInfoIsOpen] = useState(false);
  const handleClose = useCallback(() => setInfoIsOpen(false), []);

  return (
    <div className="flex w-full h-10 mt-10 bottom-0 justify-end pr-4 items-center gap-1 text-xs">
      <CodeXml 
        size={16} 
        className="text-purple-500 duration-300 transition-all hover:scale-130 cursor-pointer"
        onClick={() => setInfoIsOpen(!infoIsOpen)}
      />

      <InfoPopup
        isOpen={infoIsOpen}
        close={handleClose}
      />

    </div>


  );
}

export default Footer