import React, { useRef, useMemo, useEffect } from "react";
import { FiPlus, FiX, FiEdit2, FiChevronDown } from "react-icons/fi";
import "./personalinfosection.scss";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  setPersonalField,
  toggleOptionalField,
} from "../../../reducers/personalInfoSlice";
import type { IPersonalInfoData } from "../../../interfaces/IPersonalInfo";
import { LuUserPen } from "react-icons/lu";
import {
  setOnlySectionOpen,
  setSectionProgress,
  toggleSectionOpen,
} from "../../../reducers/cvSectionsSlice";

type OptionalFieldKey = Extract<
  keyof IPersonalInfoData,
  | "city"
  | "address"
  | "postalCode"
  | "birthDate"
  | "nationality"
  | "civilStatus"
  | "website"
  | "linkedin"
  | "custom"
>;

const OPTIONAL_FIELDS: {
  key: OptionalFieldKey;
  label: string;
  placeholder: string;
}[] = [
  { key: "city", label: "Ciudad", placeholder: "Ej: Bogotá, Colombia" },
  { key: "address", label: "Dirección", placeholder: "Ej: Calle 123 #45" },
  { key: "postalCode", label: "Código Postal", placeholder: "Ej: 110111" },
  { key: "birthDate", label: "Fecha de Nacimiento", placeholder: "DD/MM/AAAA" },
  { key: "nationality", label: "Nacionalidad", placeholder: "Ej: Colombiana" },
  { key: "civilStatus", label: "Estado Civil", placeholder: "Ej: Soltero(a)" },
  { key: "website", label: "Sitio Web", placeholder: "https://tusitio.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/usuario" },
  { key: "custom", label: "Campo Personalizado", placeholder: "" },
];

const BASE_FIELDS: {
  key: keyof IPersonalInfoData;
  label: string;
  placeholder: string;
}[] = [
  { key: "firstName", label: "Nombre", placeholder: "Ej: Carlos" },
  { key: "lastName", label: "Apellidos", placeholder: "Ej: López Gómez" },
  { key: "desiredJob", label: "Puesto deseado", placeholder: "Ej: Frontend Developer" },
  { key: "email", label: "Correo", placeholder: "Ej: correo@ejemplo.com" },
  { key: "phone", label: "Teléfono", placeholder: "Ej: +57 301 0000000" },
];

/** Normaliza cualquier valor para evitar crashes en inputs controlados */
const safeString = (v: unknown): string => (typeof v === "string" ? v : "");

const PersonalInfoSection: React.FC = () => {
  const dispatch = useDispatch();

  const sectionState = useSelector((state: IState) =>
    state.cvSections.find((s) => s.name === "personalInfoSection")
  );

  const isOpen = sectionState?.isOpen ?? false;
  const data = useSelector((state: IState) => state.personalInfo);

  const labelRef = useRef<HTMLSpanElement>(null);

  const updateField = <K extends keyof IPersonalInfoData>(
    field: K,
    value: IPersonalInfoData[K]
  ) => {
    dispatch(setPersonalField({ field, value }));
  };

  const handleInlineEdit = () => {
    if (!labelRef.current) return;
    labelRef.current.contentEditable = "true";
    labelRef.current.focus();
  };

  const handleInlineBlur = () => {
    if (!labelRef.current) return;
    labelRef.current.contentEditable = "false";

    const newValue = labelRef.current.innerText.trim();
    updateField("customLabel", (newValue || "Campo personalizado") as any);
  };

  /** PROGRESO BASADO SOLO EN CAMPOS DE TEXTO USADOS */
  const progress = useMemo(() => {
    // total = base fields + active optional fields
    const total = BASE_FIELDS.length + data.activeFields.length;
    let complete = 0;

    // count base fields with value
    for (const f of BASE_FIELDS) {
      const v = data[f.key];
      if (typeof v === "string" && v.trim() !== "") {
        complete++;
      }
    }

    // count optional active fields
    for (const keyRaw of data.activeFields) {
      if (keyRaw === "custom") {
        const v = data.customValue;
        if (typeof v === "string" && v.trim() !== "") {
          complete++;
        }
      } else {
        const v = data[keyRaw as keyof IPersonalInfoData];
        if (typeof v === "string" && v.trim() !== "") {
          complete++;
        }
      }
    }

    if (total === 0) return 0;
    return Math.round((complete / total) * 100);
  }, [data]);

  /** Sincroniza el progreso con Redux */
  useEffect(() => {
    dispatch(
      setSectionProgress({ name: "personalInfoSection", progress })
    );
  }, [progress, dispatch]);

  return (
    <div className={`personalinfo-section ${isOpen ? "" : "closed"}`}>
      <div className="section-header">
        <h2>
          <LuUserPen /> Información Personal
        </h2>

        <div className="progress-indicator">{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("personalInfoSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      <div className="collapsible-content">
        {/* CAMPOS BASE */}
        <div className="fields-grid">
          {BASE_FIELDS.map((f) => (
            <div className="field" key={String(f.key)}>
              <label>{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={safeString(data[f.key])}
                onChange={(e) => updateField(f.key, e.target.value as any)}
              />
            </div>
          ))}

          {/* CAMPOS OPCIONALES ACTIVOS */}
          {data.activeFields.map((keyRaw) => {
            const key = keyRaw as OptionalFieldKey;
            const field = OPTIONAL_FIELDS.find((o) => o.key === key);
            if (!field) return null;

            if (key === "custom") {
              return (
                <div className="field optional" key={key}>
                  <div className="custom-label-row">
                    <span
                      ref={labelRef}
                      className="custom-label inline-editable"
                      onClick={handleInlineEdit}
                      onBlur={handleInlineBlur}
                      suppressContentEditableWarning
                    >
                      {safeString(data.customLabel) || "Campo personalizado"}
                    </span>

                    <FiEdit2 onClick={handleInlineEdit} className="edit-icon" />
                  </div>

                  <div className="input-remove">
                    <input
                      type="text"
                      placeholder="Valor..."
                      value={safeString(data.customValue)}
                      onChange={(e) =>
                        updateField("customValue", e.target.value as any)
                      }
                    />

                    <button
                      className="remove-btn"
                      onClick={() => dispatch(toggleOptionalField(key))}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div className="field optional" key={key}>
                <label>{field.label}</label>
                <div className="input-remove">
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={safeString(data[key])}
                    onChange={(e) =>
                      updateField(key, e.target.value as any)
                    }
                  />

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(toggleOptionalField(key))}
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTONES PARA AGREGAR CAMPOS */}
        <div className="personalinfo-section__addfields">
          {OPTIONAL_FIELDS.filter(
            (f) => !data.activeFields.includes(f.key)
          ).map((f) => (
            <button key={f.key} onClick={() => dispatch(toggleOptionalField(f.key))}>
              <FiPlus /> {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
