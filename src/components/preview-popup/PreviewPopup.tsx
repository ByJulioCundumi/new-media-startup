// components/preview-popup/PreviewPopup.tsx
import React, { useRef, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { FaDownload, FaTimes } from "react-icons/fa";
import { togglePreviewPopup } from "../../reducers/toolbarOptionSlice";
import { useReactToPrint } from "react-to-print";

import "./previewpopup.scss";

interface PreviewPopupProps {
  children: ReactNode;
}

export const PreviewPopup: React.FC<PreviewPopupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Mi-CV",
  });

  const closePopup = () => dispatch(togglePreviewPopup());

  return (
    <div className="preview-popup" onClick={closePopup}>
      
      {/* Este wrapper evita cerrar cuando haces clic dentro del contenido */}
      <div
        className="preview-popup__shield"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="preview-popup__header">
          <button className="preview-popup__close" onClick={closePopup}>
            <FaTimes />
          </button>

          <button className="preview-popup__download" onClick={handlePrint}>
            <FaDownload />
          </button>
        </div>

        {/* Contenido imprimible */}
        <div ref={printRef} className="preview-popup__content">
          {children}
        </div>
      </div>
    </div>
  );
}
