import React from "react";
import { LuScanQrCode } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setAllowQrCode } from "../../reducers/identitySlice";
import type { IState } from "../../interfaces/IState";
import "./qrtogglebutton.scss";

const QrToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const { allowQrCode } = useSelector((state: IState) => state.identity);

  return (
    <button className="toolbar-cv-btn icon-btn qr-btn" title="Mostrar QR">
      <label className="toolbar-cv-switch">
        <LuScanQrCode />
        <input
          type="checkbox"
          checked={allowQrCode}
          onChange={() => dispatch(setAllowQrCode(!allowQrCode))}
        />
        <span className="toolbar-cv-slider" />
      </label>
    </button>
  );
};

export default QrToggleButton;
