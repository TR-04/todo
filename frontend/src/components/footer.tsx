import { CodeXml } from "lucide-react";
import { useState, useCallback } from "react";
import InfoPopup from "./info-popup";

const Footer = () => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const handleClose = useCallback(() => setInfoIsOpen(false), []);

  return (
    <div className="bottom-0 mt-10 flex h-10 w-full items-center justify-end gap-1 pr-4 text-xs">
      <CodeXml
        size={16}
        className="cursor-pointer text-purple-500 transition-all duration-300 hover:scale-130"
        onClick={() => setInfoIsOpen(!infoIsOpen)}
      />

      <InfoPopup isOpen={infoIsOpen} close={handleClose} />
    </div>
  );
};

export default Footer;
