import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./colorfontpopup.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const suggestedColors = [
  "#1E88E5", "#E53935", "#43A047", "#FB8C00",
  "#8E24AA", "#3949AB", "#00897B", "#6D4C41",
];

const fontOptions = [
  "Roboto",
  "Montserrat",
  "Open Sans",
  "Lato",
  "Poppins",
  "Merriweather",
  "Playfair Display",
  "Inter",
];

const ColorFontPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedColor,
  onColorChange,
  selectedFont,
  onFontChange,
}) => {
  const [manualColor, setManualColor] = useState(selectedColor);
  const [cssFontCode, setCssFontCode] = useState("");

  useEffect(() => {
    setManualColor(selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    setCssFontCode(`font-family: '${selectedFont}', sans-serif;`);
  }, [selectedFont]);

  if (!isOpen) return null;

  return (
    <div className="cfp-overlay">
      <div className="cfp-container">

        <div className="cfp-header">
          <h3>Personalizar Tu CV</h3>
          <button className="cfp-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Selector de color manual */}
        <div className="cfp-section">
          <label>Color manual</label>

          <div className="cfp-color-manual-wrapper">
            <input
              type="text"
              value={manualColor}
              onChange={(e) => setManualColor(e.target.value)}
              placeholder="#000000 o rgb(0,0,0)"
              className="cfp-color-manual"
            />
            <button
              className="cfp-apply-btn"
              onClick={() => onColorChange(manualColor)}
            >
              Aplicar
            </button>

            <div
              className="cfp-color-preview"
              style={{ backgroundColor: manualColor }}
            />
          </div>
        </div>

        {/* Selector de color nativo */}
        <div className="cfp-section">
          <label>Selector de color</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="cfp-color-input"
          />
        </div>

        {/* Colores sugeridos */}
        <div className="cfp-section">
          <label>Colores sugeridos</label>
          <div className="cfp-suggested-colors">
            {suggestedColors.map((color) => (
              <button
                key={color}
                className={`cfp-color-item ${
                  selectedColor === color ? "active" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </div>

        {/* Selector de fuente */}
        <div className="cfp-section">
          <label>Tipo de fuente</label>

          <select
            value={selectedFont}
            onChange={(e) => onFontChange(e.target.value)}
            className="cfp-font-select"
          >
            {fontOptions.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="cfp-footer">
          <button className="cfp-accept" onClick={onClose}>
            Listo
          </button>
        </div>

      </div>
    </div>
  );
};

export default ColorFontPopup;
