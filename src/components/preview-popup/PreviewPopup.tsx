import React, { useRef, useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload, FaTimes } from "react-icons/fa";
import { togglePreviewPopup } from "../../reducers/toolbarOptionSlice";
import { useReactToPrint } from "react-to-print";
import type { IState } from "../../interfaces/IState";

import "./previewpopup.scss";

interface PreviewPopupProps {
  children: ReactNode;
}

export const PreviewPopup: React.FC<PreviewPopupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  const { startPrint } = useSelector((state: IState) => state.toolbarOption);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Mi-CV",
  });

  /** Disparar print automáticamente si startPrint === true */
  useEffect(() => {
    if (startPrint) {
      setTimeout(() => {
        handlePrint();
        dispatch({ type: "toolbarOption/setStartPrint", payload: false });
      }, 200);
    }
  }, [startPrint, handlePrint, dispatch]);

  const closePopup = () => dispatch(togglePreviewPopup());

  return (
    <div className="preview-popup" onClick={closePopup}>
      <div className="preview-popup__shield" onClick={(e) => e.stopPropagation()}>
        <div className="preview-popup__header">
          <button className="preview-popup__close" onClick={closePopup}>
            <FaTimes />
          </button>

          <button className="preview-popup__download" onClick={handlePrint}>
            <FaDownload />
          </button>
        </div>

        <div ref={printRef} className="preview-popup__content">
          {children}
        </div>
      </div>
    </div>
  );
};
