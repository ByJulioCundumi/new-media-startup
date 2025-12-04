// TemplatesPopup.tsx
import React, { useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import { templates } from "../templates";
import "./templatespopup.scss";
import { useDispatch } from "react-redux";
import { toggleTemplatePopup } from "../../reducers/toolbarOptionSlice";
import type { ITemplateProps } from "../../interfaces/ITemplateProps";

import { initialSections } from "../../reducers/cvSectionsSlice"; 
import { initialOrder } from "../../reducers/cvSectionsSlice"; 

// Datos vacíos completamente tipados
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

  sectionsConfig: initialSections,   // ✔ AHORA SÍ un ICvSection[]
  sectionsOrder: initialOrder, 
};

export default function TemplatesPopup() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const dispatch = useDispatch();

  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) =>
      tpl.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sortedTemplates = useMemo(() => {
    const selected = filteredTemplates.find((t) => t.id === selectedId);
    const others = filteredTemplates.filter((t) => t.id !== selectedId);
    return selected ? [selected, ...others] : others;
  }, [filteredTemplates, selectedId]);

  return (
    <div className="templates-popup">
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
          const Template = tpl.component;

          return (
            <div
              key={tpl.id}
              className={`template-card ${tpl.id === selectedId ? "selected" : ""}`}
              onClick={() => setSelectedId(tpl.id)}
            >
              <div className="preview">
                <div className="preview-scale">
                  <Template {...emptyData} />
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
  );
}
