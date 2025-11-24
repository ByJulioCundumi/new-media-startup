import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload, FaTimes } from "react-icons/fa";
import "./previewpopup.scss";

export default function PreviewPopup({ children }) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = useReactToPrint({
    contentRef: printRef,
    documentTitle: "preview",
  });

  return (
    <div className="preview-popup-overlay">
      <div className="preview-popup">

        <div className="preview-popup-header">
          <button className="popup-btn download" onClick={handleDownload}>
            <FaDownload />
            Descargar
          </button>

          <button className="popup-btn close">
            <FaTimes />
            Cerrar
          </button>
        </div>

        {/* 🔥 Esta es la zona imprimible */}
        <div ref={printRef} className="preview-popup-content print-area">
          {children}
        </div>

      </div>
    </div>
  );
}
