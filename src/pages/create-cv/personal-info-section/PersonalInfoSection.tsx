import React, { useRef, useState } from "react";
import { FiPlus, FiX, FiUser, FiEdit2, FiChevronDown } from "react-icons/fi";
import "./personalinfosection.scss";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { setPersonalField, toggleOptionalField } from "../../../reducers/personalInfoSlice";
import type { IPersonalInfoData } from "../../../interfaces/IPersonalInfo";

// ----- TIPADO ADECUADO -----
const OPTIONAL_FIELDS: { key: keyof IPersonalInfoData; label: string; placeholder: string }[] = [
  { key: "address", label: "Dirección", placeholder: "Ej: Calle 123 #45" },
  { key: "postalCode", label: "Código Postal", placeholder: "Ej: 110111" },
  { key: "birthDate", label: "Fecha de Nacimiento", placeholder: "DD/MM/AAAA" },
  { key: "nationality", label: "Nacionalidad", placeholder: "Ej: Colombiana" },
  { key: "civilStatus", label: "Estado Civil", placeholder: "Ej: Soltero(a)" },
  { key: "website", label: "Sitio Web", placeholder: "https://tusitio.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/usuario" },
  { key: "custom", label: "Campo Personalizado", placeholder: "" },
];

const BASE_FIELDS: { key: keyof IPersonalInfoData; label: string; placeholder: string }[] = [
  { key: "firstName", label: "Nombre", placeholder: "Ej: Carlos" },
  { key: "lastName", label: "Apellidos", placeholder: "Ej: López Gómez" },
  { key: "desiredJob", label: "Puesto deseado", placeholder: "Ej: Frontend Developer" },
  { key: "email", label: "Correo", placeholder: "Ej: correo@ejemplo.com" },
  { key: "phone", label: "Teléfono", placeholder: "Ej: +57 301 0000000" },
  { key: "city", label: "Ciudad", placeholder: "Ej: Bogotá, Colombia" },
];

const PersonalInfoSection: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const data = useSelector((state: IState) => state.personalInfo);

  const labelRef = useRef<HTMLSpanElement>(null);

  const updateField = <K extends keyof IPersonalInfoData>(field: K, value: IPersonalInfoData[K]) => {
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

    updateField("customLabel", newValue.length > 0 ? newValue : "Campo personalizado");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateField("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className={`personalinfo-section ${isOpen ? "" : "closed"}`}>
      <div className="section-header">
        <h2>Información Personal</h2>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {/* CONTENIDO QUE SE COLAPSA */}
      <div className="collapsible-content">
        {/* FOTO */}
        <div className="photo-upload-block">
          <label className="photo-click">
            {data.photo ? (
              <img src={data.photo} alt="Foto" />
            ) : (
              <div className="photo-placeholder">
                <FiUser />
              </div>
            )}

            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </label>
          <p>Tu foto de perfil</p>
        </div>

        {/* CAMPOS BASE */}
        <div className="fields-grid">
          {BASE_FIELDS.map((f) => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={data[f.key] ?? ""}
                onChange={(e) => updateField(f.key, e.target.value)}
              />
            </div>
          ))}

          {/* CAMPOS OPCIONALES */}
          {data.activeFields.map((key) => {
            const field = OPTIONAL_FIELDS.find((o) => o.key === key);
            if (!field) return null;

            // CUSTOM FIELD
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
                      {data.customLabel || "Campo personalizado"}
                    </span>

                    <FiEdit2 onClick={handleInlineEdit} className="edit-icon" />
                  </div>

                  <div className="input-remove">
                    <input
                      type="text"
                      placeholder="Valor..."
                      value={data.customValue ?? ""}
                      onChange={(e) => updateField("customValue", e.target.value)}
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
                    value={data[key] ?? ""}
                    onChange={(e) => updateField(key, e.target.value)}
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
