import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuEye, LuNewspaper } from "react-icons/lu";
import { FaDownload, FaPalette } from "react-icons/fa";
import { TbWorldCode, TbWorldOff } from "react-icons/tb";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { setAllowQrCode } from "../../reducers/identitySlice";
import { togglePreviewPopup } from "../../reducers/toolbarOptionSlice";
import { openPopup } from "../../reducers/colorFontSlice";

import type { IState } from "../../interfaces/IState";
import "./verticaltoolbarcv.scss";

const VerticalToolbarCV: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { allowQrCode } = useSelector((state: IState) => state.identity);
  const { previewPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

  return (
    <>
      {/* Flecha mobile */}
      <button
        className="toolbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoChevronForward /> : <IoChevronBack />}
      </button>

      <div className={`vertical-toolbar-cv ${isOpen ? "open" : ""}`}>
        <button
          onClick={() => dispatch(setAllowQrCode(!allowQrCode))}
          className="vertical-toolbar-btn"
          title="QR"
        >
          {allowQrCode ? <TbWorldCode /> : <TbWorldOff />}
        </button>

        <button
          onClick={() => dispatch(openPopup())}
          className="vertical-toolbar-btn"
          title="Estilos"
        >
          <FaPalette />
        </button>

        <button
          className="vertical-toolbar-btn vertical-preview"
          title="Vista previa"
          onClick={() => dispatch(togglePreviewPopup())}
        >
          {previewPopupOpen ? <LuNewspaper /> : <LuEye />}
        </button>

        <button
          className="vertical-toolbar-btn"
          title="Descargar PDF"
          onClick={() => {
            dispatch(togglePreviewPopup());
            setTimeout(() => {
              dispatch({
                type: "toolbarOption/setStartPrint",
                payload: true,
              });
            }, 50);
          }}
        >
          <FaDownload />
        </button>
      </div>
    </>
  );
};

export default VerticalToolbarCV;
