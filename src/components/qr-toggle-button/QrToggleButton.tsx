import React from "react";
import { LuScanQrCode } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setAllowQrCode } from "../../reducers/identitySlice";
import type { IState } from "../../interfaces/IState";
import "./qrtogglebutton.scss";
import { MdOutlinePublicOff, MdPublic } from "react-icons/md";

const QrToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const { allowQrCode } = useSelector((state: IState) => state.identity);

  return (
    <button onClick={() => dispatch(setAllowQrCode(!allowQrCode))} className="toolbar-cv-btn icon-btn qr-btn" title="Mostrar QR">
        {allowQrCode === true ? <MdPublic /> : <MdOutlinePublicOff />} Ver Online
    </button>
  );
};

export default QrToggleButton;
