// TemplatesPopup.tsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { templates } from "../templates";
import "./templatespopup.scss";

import { useDispatch, useSelector } from "react-redux";
import { toggleTemplatePopup } from "../../reducers/toolbarOptionSlice";
import { setTemplate } from "../../reducers/templateSlice";

import type { ITemplateProps } from "../../interfaces/ITemplateProps";

import { initialSections, initialOrder } from "../../reducers/cvSectionsSlice";
import { mockTemplateData } from "../mockTemplateData";

const emptyData: ITemplateProps = {
  personalInfo: [],
  profileSection: "",
  educationSection: [],
  experienceSection: [],
  skillSection: [],
  languageSection: [],
  linkSection: [],
  courseSection: [],
  hobbieSection: [],
  referenceSection: [],
  awardSection: [],
  customSection: [],

  identitySection: {
    allowQrCode: false,
    qrCodeUrl: "",
  },

  contactSection: [],

  sectionsConfig: initialSections,
  sectionsOrder: initialOrder,
};

export default function TemplatesPopup() {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  // *** selectedId VIENE DE REDUX ***
  const selectedId = useSelector((state: any) => state.template.id);

  const [search, setSearch] = useState("");

  /** Cerrar al hacer clic fuera */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        dispatch(toggleTemplatePopup());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  /** FILTRAR */
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) =>
      tpl.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /** ORDENAR */
  const sortedTemplates = useMemo(() => {
    const selected = filteredTemplates.find((t) => t.id === selectedId);
    const others = filteredTemplates.filter((t) => t.id !== selectedId);
    return selected ? [selected, ...others] : others;
  }, [filteredTemplates, selectedId]);

  /** CAMBIAR PLANTILLA (no cerrar popup aquí) */
  const handleSelectTemplate = (id: string) => {
    dispatch(setTemplate(id)); // 🔥 sincroniza con Redux
  };

  return (
    <div className="templates-overlay">
      <div className="templates-popup" ref={popupRef}>
        <div className="popup-header">
          <h2>Plantillas de CV</h2>
          <button
            onClick={() => dispatch(toggleTemplatePopup())}
            className="close-btn"
          >
            <X size={20} />
          </button>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar plantilla..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="templates-list">
          {sortedTemplates.map((tpl) => {
  const TemplateComponent = tpl.component;

  return (
    <div
      key={tpl.id}
      className={`template-card ${tpl.id === selectedId ? "selected" : ""}`}
      onClick={() => handleSelectTemplate(tpl.id)}
    >
      <div className="preview">
        <div className="preview-scale">
          <TemplateComponent {...mockTemplateData} />
        </div>
      </div>

      <div className="info">
        <h3>{tpl.label}</h3>
        <p>{tpl.category.join(", ")}</p>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
}
