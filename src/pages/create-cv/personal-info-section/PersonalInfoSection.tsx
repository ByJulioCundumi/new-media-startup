import React, { useRef, useState, useMemo } from "react";
import { FiPlus, FiX, FiEdit2, FiChevronDown } from "react-icons/fi";
import "./personalinfosection.scss";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import {
  setPersonalField,
  toggleOptionalField,
  setDisablePhoto,
} from "../../../reducers/personalInfoSlice";
import type { IPersonalInfoData } from "../../../interfaces/IPersonalInfo";
import { LuUserPen } from "react-icons/lu";
import { IoIosCamera } from "react-icons/io";

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

/** Normaliza cualquier valor a string seguro para `value` de un input */
const safeString = (v: unknown): string => (typeof v === "string" ? v : "");

const PersonalInfoSection: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.disablePhoto) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateField("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    if (!data.disablePhoto) {
      updateField("photo", "");
    }
  };

  const progress = useMemo(() => {
    // contabiliza base + foto (si está habilitada) + opcionales activos
    let total = BASE_FIELDS.length + 1; // +1 para la foto
    let complete = 0;

    // base fields
    for (const f of BASE_FIELDS) {
      const val = data[f.key];
      if (typeof val === "string" && val.trim()) complete++;
    }

    // foto (solo si no está deshabilitada)
    if (!data.disablePhoto) {
      if (typeof data.photo === "string" && data.photo.trim()) complete++;
    } else {
      total--; // si está deshabilitada no cuenta en el total
    }

    // campos opcionales activos
    for (const key of data.activeFields) {
      total++;
      if (key === "custom") {
        const v = data.customValue;
        if (typeof v === "string" && v.trim()) complete++;
      } else {
        const v = data[key as keyof IPersonalInfoData];
        if (typeof v === "string" && v.trim()) complete++;
      }
    }

    // evitar división por cero (por si acaso)
    if (total <= 0) return 0;
    return Math.round((complete / total) * 100);
  }, [data]);

  return (
    <div className={`personalinfo-section ${isOpen ? "" : "closed"}`}>
      <div className="section-header">
        <h2>
          <LuUserPen /> Información Personal
        </h2>

        <div className="progress-percentage">{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      <div className="collapsible-content">
        {/* FOTO */}
        <div className="photo-upload-row">
          <div className={`photo-upload-block ${data.disablePhoto ? "disabled" : ""}`}>
            <div className="photo-upload-block__main">
              <label className="photo-click">
                {data.photo && !data.disablePhoto ? (
                  <img src={data.photo} alt="Foto" />
                ) : (
                  <div className="photo-placeholder">
                    <IoIosCamera />
                  </div>
                )}

                {!data.disablePhoto && (
                  <input
                    type="file"
                    accept="image/*"
                    disabled={data.disablePhoto}
                    onChange={handlePhotoUpload}
                  />
                )}
              </label>

              <p>
                {data.disablePhoto ? "Foto deshabilitada para esta plantilla" : "Tu foto de perfil"}
              </p>
            </div>

            {!data.disablePhoto && data.photo && (
              <button className="remove-photo-btn" onClick={removePhoto}>
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Toggle para deshabilitar/habilitar foto 

        <div className="disable-photo-toggle">
          <button
            onClick={() => dispatch(setDisablePhoto(!Boolean(data.disablePhoto)))}
            className={data.disablePhoto ? "off" : "on"}
          >
            {data.disablePhoto ? "Habilitar foto" : "Deshabilitar foto"}
          </button>
        </div>
        
        */}
        

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
            // keyRaw viene del state: keyof IPersonalInfoData
            const key = keyRaw as OptionalFieldKey;
            const field = OPTIONAL_FIELDS.find((o) => o.key === key);
            if (!field) return null;

            if (key === "custom") {
              return (
                <div className="field optional" key={String(key)}>
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
                      onChange={(e) => updateField("customValue", e.target.value as any)}
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

            // Para otros opcionales (city, address, etc.)
            return (
              <div className="field optional" key={String(key)}>
                <label>{field.label}</label>
                <div className="input-remove">
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={safeString(data[key as keyof IPersonalInfoData])}
                    onChange={(e) => updateField(key as any, e.target.value as any)}
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
          {OPTIONAL_FIELDS.filter((f) => !data.activeFields.includes(f.key)).map((f) => (
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
