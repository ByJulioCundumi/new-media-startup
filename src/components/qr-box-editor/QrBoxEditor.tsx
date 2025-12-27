import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaQrcode,
  FaChevronDown,
  FaChevronUp,
  FaLink,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { IState } from "../../interfaces/IState";
import { setQrCodeUrl } from "../../reducers/identitySlice";

import "./qrBoxEditor.scss";

const BASE_CV_URL = "https://www.cvremoto.com";

// 🔒 Límite máximo recomendado de caracteres para QR legible
const MAX_QR_URL_LENGTH = 65;

const QrBoxEditor = () => {
  const dispatch = useDispatch();

  const qrCodeUrl = useSelector(
    (state: IState) => state.identity.qrCodeUrl ?? ""
  );

  const { publicId } = useSelector(
    (state: IState) => state.cvCreation
  );

  const [isCollapsed, setIsCollapsed] = useState(false);

  const defaultUrl = publicId
    ? `${BASE_CV_URL}/cv/${publicId}`
    : BASE_CV_URL;

  // ✅ Modo derivado
  const isDefaultMode = qrCodeUrl === defaultUrl;

  // ⚠️ Advertencia por longitud
  const isUrlTooLong = useMemo(() => {
    if (isDefaultMode) return false;
    return qrCodeUrl.length > MAX_QR_URL_LENGTH;
  }, [qrCodeUrl, isDefaultMode]);

  const handleSelectDefault = () => {
    dispatch(setQrCodeUrl(defaultUrl));
  };

  const handleSelectCustom = () => {
    if (isDefaultMode) {
      dispatch(setQrCodeUrl(""));
    }
  };

  const handleCustomChange = (value: string) => {
    dispatch(setQrCodeUrl(value));
  };

  return (
    <aside className={`qr-box ${isCollapsed ? "qr-box--collapsed" : ""}`}>
      <header className="qr-box__header">
        <div className="qr-box__title">
          <FaQrcode />
          <span>Código QR</span>
        </div>

        <button
          type="button"
          className="qr-box__toggle"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </header>

      {!isCollapsed && (
        <div className="qr-box__content">
          <div className="qr-box__options">
            <label className="qr-box__option">
              <input
                type="radio"
                checked={isDefaultMode}
                onChange={handleSelectDefault}
              />
              <span>
                Ver CV online
                <small>{defaultUrl}</small>
              </span>
            </label>

            <label className="qr-box__option">
              <input
                type="radio"
                checked={!isDefaultMode}
                onChange={handleSelectCustom}
              />
              <span>URL personalizada</span>
            </label>
          </div>

          {!isDefaultMode && (
            <>
              <div className="qr-box__input-wrapper">
                <FaLink />
                <input
                  type="url"
                  placeholder="https://miportafolio.com"
                  value={qrCodeUrl}
                  onChange={(e) => handleCustomChange(e.target.value)}
                />
              </div>

              {isUrlTooLong && (
                <div className="qr-box__warning">
                  <FaExclamationTriangle />
                  <span>
                    La URL supera el límite recomendado
                    para una correcta lectura del QR.
                    Se recomienda usar un acortador de URL.
                  </span>
                </div>
              )}
            </>
          )}

          {isDefaultMode && (
            <div className="qr-box__default-url">{defaultUrl}</div>
          )}
        </div>
      )}
    </aside>
  );
};

export default QrBoxEditor;
