import React, { useEffect, useCallback, useMemo, useState, useRef } from "react";
import {
  FiX,
  FiRefreshCw,
  FiType,
  FiDroplet,
  FiInfo,
} from "react-icons/fi";
import { IoColorPaletteSharp } from "react-icons/io5";

import "./colorfontpopup.scss";

import { useDispatch, useSelector } from "react-redux";

import {
  closePopup,
  setProfessionColor,
  setSectionTitleColor,
  setItemColor,
  setQrColor,
  setFont,
  restoreDefaults,
  loadTemplateDefaults,
  loadStoredValues,
  setNameColor,
  setTextColor,
} from "../../reducers/colorFontSlice";
import type { IState } from "../../interfaces/IState";
import { RiDraggable } from "react-icons/ri";

const ColorFontPopup: React.FC = () => {
  const dispatch = useDispatch();
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  const { isOpen, selected, defaults } = useSelector(
    (state: IState) => state.colorFont
  );
  const DEFAULT_TEMPLATE = useSelector((state:IState)=>state.colorFont.defaults)

  // 🖱 estado para mover el popup
  const [position, setPosition] = useState({ x: 60, y: 110 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

const fontOptions = [
  "Arial, Helvetica, sans-serif",
  "Roboto",
  "Montserrat",
  "Open Sans",
  "Lato",
  "Merriweather",
  "Playfair Display",
  "Inter",
];

const isDraggable = sidebarOption === "home";
const canClose = sidebarOption !== "home";

  // Iniciar drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(!isDraggable);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Mover popup
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  // Terminar drag
  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  /** SAVE AUTO */
  useEffect(() => {
    if (!isOpen) return;
    localStorage.setItem("cv_color_config", JSON.stringify(selected));
  }, [selected, isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canClose && e.target === e.currentTarget) dispatch(closePopup());
    },
    [dispatch, canClose]
  );

  const hasChanges = useMemo(() => {
    return JSON.stringify(selected) !== JSON.stringify(defaults);
  }, [selected, defaults]);

  if (!isOpen) return null;

  const ColorBox = (label: string, value: string, setter: (v: string) => any) => (
    <div className="cfp-box">
      <div className="cfp-box-header">
        <FiDroplet className="cfp-box-icon" />
        <span>{label}</span>
      </div>

      <div className="cfp-inner-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="cfp-text-input"
          placeholder="#000000"
        />

        <input
          type="color"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="cfp-color-btn"
        />
      </div>
    </div>
  );

  return (
    <div className={sidebarOption !== "home" ? "cfp-overlay" : ""} onMouseDown={handleOverlayClick}>
      <div
        ref={containerRef}
        className="cfp-container"
        style={sidebarOption !== "home" ? { top: position.y, left: position.x, position: "absolute" } :{ top: position.y, left: position.x } }
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* HEADER draggable */}
        <div className="cfp-header" onMouseDown={handleMouseDown} style={{ cursor: isDraggable ? "move" : "default" }}>
          {sidebarOption !== "home" && <h3> <RiDraggable /> Personaliza Tu CV</h3>}
          {canClose && (
            <button className="cfp-close" onClick={() => dispatch(closePopup())}>
              <FiX />
            </button>
          )}
        </div>

        {/* resto del contenido... */}
        <div className="cfp-subtitle">
          <IoColorPaletteSharp />
          <span>Colores</span>
        </div>

        <div className="cfp-grid">
          {ColorBox("Texto", selected.textColor, (c) => dispatch(setTextColor(c)))}
          {ColorBox("Título", selected.nameColor, (c) => dispatch(setNameColor(c)))}
          {ColorBox("Profesión", selected.professionColor, (c) =>
            dispatch(setProfessionColor(c))
          )}
          {ColorBox("Secciones", selected.sectionTitleColor, (c) =>
            dispatch(setSectionTitleColor(c))
          )}
          {ColorBox("Ítems", selected.itemColor, (c) => dispatch(setItemColor(c)))}
          {ColorBox("Código QR", selected.qrColor, (c) => dispatch(setQrColor(c)))}
        </div>

        <div className="cfp-subtitle">
          <FiType />
          <span>Tipografía</span>
        </div>

        <div className="cfp-font-wrapper">
          <select
            value={selected.font}
            onChange={(e) => dispatch(setFont(e.target.value))}
            className="cfp-font-select"
          >
            {fontOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`cfp-reset-btn ${!hasChanges ? "disabled" : ""}`}
          disabled={!hasChanges}
          onClick={() => hasChanges && dispatch(restoreDefaults())}
        >
          {hasChanges ? <FiRefreshCw /> : <FiInfo />}
          <span>
            {hasChanges
              ? "Restaurar cambios"
              : "Valores predeterminados de la plantilla"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ColorFontPopup;
