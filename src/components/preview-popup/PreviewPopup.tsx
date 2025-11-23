import React, { useRef, useEffect } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { togglePreviewPopup } from "../../reducers/toolbarOptionSlice";
import type { ReactNode } from "react";
import "./previewpopup.scss";

interface PreviewPopupProps {
  children: ReactNode; // Aquí se renderiza la plantilla
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    dispatch(togglePreviewPopup());
  };

  const handleDownload = () => {
    // Lógica de descarga PDF (html2canvas / jsPDF)
    console.log("Descargar PDF");
  };

  // Cerrar popup al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="preview-popup-overlay">
      <div className="preview-popup" ref={popupRef}>
        <div className="preview-popup-header">
          {/* Logo + nombre app */}
          <div className="popup-header-left">
            <span className="popup-app-name">Mi CV App</span>
          </div>

          {/* Botones a la derecha */}
          <div className="popup-header-right">
            <button className="popup-btn download" onClick={handleDownload}>
              <FaDownload /> Descargar
            </button>
            <button className="popup-btn close" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="preview-popup-content">{children}</div>
      </div>
    </div>
  );
};

export default PreviewPopup;
