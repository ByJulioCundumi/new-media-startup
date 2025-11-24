import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuScanQrCode, LuEye, LuNewspaper } from "react-icons/lu";
import { FaRegEyeSlash, FaDownload } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";

import { setAllowQrCode } from "../../reducers/identitySlice";
import { togglePreviewPopup } from "../../reducers/toolbarOptionSlice";

import type { IState } from "../../interfaces/IState";

import "./verticaltoolbarcv.scss";
import { TbWorldCode } from "react-icons/tb";

const VerticalToolbarCV: React.FC = () => {
  const dispatch = useDispatch();

  const { allowQrCode } = useSelector((state: IState) => state.identity);
  const { previewPopupOpen } = useSelector((state: IState) => state.toolbarOption);

  return (
    <div className="vertical-toolbar-cv">

      <button
        className="vertical-toolbar-btn"
        title="Mostrar QR"
        onClick={() => dispatch(setAllowQrCode(!allowQrCode))}
      >
        <TbWorldCode />
      </button>

      <button
        className="vertical-toolbar-btn preview-btn"
        title="Vista previa"
        onClick={() => dispatch(togglePreviewPopup())}
      >
        {previewPopupOpen ? <LuNewspaper /> : <LuEye />}
      </button>

      <button className="vertical-toolbar-btn download-btn" title="Descargar PDF">
        <FaDownload />
      </button>

      <button className="vertical-toolbar-btn clear-btn" title="Limpiar">
        <GiBroom />
      </button>

    </div>
  );
};

export default VerticalToolbarCV;
