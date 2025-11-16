import React, { useState, useRef } from "react";
import {
  FiPlus,
  FiX,
  FiUser,
  FiEdit2,
  FiChevronDown,
} from "react-icons/fi";
import "./personalinfosection.scss";

const OPTIONAL_FIELDS = [
  { key: "address", label: "Dirección", placeholder: "Ej: Calle 123 #45" },
  { key: "postalCode", label: "Código Postal", placeholder: "Ej: 110111" },
  { key: "birthDate", label: "Fecha de Nacimiento", placeholder: "DD/MM/AAAA" },
  { key: "nationality", label: "Nacionalidad", placeholder: "Ej: Colombiana" },
  { key: "civilStatus", label: "Estado Civil", placeholder: "Ej: Soltero(a)" },
  { key: "website", label: "Sitio Web", placeholder: "https://tusitio.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/usuario" },
  { key: "custom", label: "Campo Personalizado", placeholder: "" },
];

const BASE_FIELDS = [
  { key: "firstName", label: "Nombre", placeholder: "Ej: Carlos" },
  { key: "lastName", label: "Apellidos", placeholder: "Ej: López Gómez" },
  { key: "desiredJob", label: "Puesto deseado", placeholder: "Ej: Frontend Developer" },
  { key: "email", label: "Correo", placeholder: "Ej: correo@ejemplo.com" },
  { key: "phone", label: "Teléfono", placeholder: "Ej: +57 301 0000000" },
  { key: "city", label: "Ciudad", placeholder: "Ej: Bogotá, Colombia" },
];

interface PersonalInfoData {
  photo?: string;
  firstName: string;
  lastName: string;
  desiredJob: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  postalCode?: string;
  birthDate?: string;
  nationality?: string;
  civilStatus?: string;
  website?: string;
  linkedin?: string;
  customLabel?: string;
  customValue?: string;
}

interface Props {
  initialData?: PersonalInfoData;
  onChange?: (data: PersonalInfoData) => void;
}

const PersonalInfoSection: React.FC<Props> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeFields, setActiveFields] = useState<string[]>([]);
  const [customLabel, setCustomLabel] = useState("Campo personalizado");

  const labelRef = useRef<HTMLSpanElement>(null);

  const [data, setData] = useState<PersonalInfoData>(
    initialData || {
      firstName: "",
      lastName: "",
      desiredJob: "",
      email: "",
      phone: "",
      city: "",
    }
  );

  const updateField = (field: keyof PersonalInfoData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onChange?.(newData);
  };

  const toggleField = (key: string) => {
    if (activeFields.includes(key)) {
      setActiveFields((prev) => prev.filter((f) => f !== key));
      updateField(key as keyof PersonalInfoData, "");

      if (key === "custom") {
        setCustomLabel("Campo personalizado");
        updateField("customLabel", "");
      }
    } else {
      setActiveFields((prev) => [...prev, key]);
    }
  };

  const enableInlineEdit = () => {
    if (!labelRef.current) return;
    labelRef.current.contentEditable = "true";
    labelRef.current.focus();
  };

  const handleInlineBlur = () => {
    if (!labelRef.current) return;
    labelRef.current.contentEditable = "false";
    const newValue = labelRef.current.innerText.trim();

    if (newValue.length > 0) {
      setCustomLabel(newValue);
      updateField("customLabel", newValue);
    } else {
      labelRef.current.innerText = customLabel;
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateField("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className={`personalinfo-section ${!isOpen ? "closed" : ""}`}>
      <div className="section-header">
        <h2>Información Personal</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <>
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

          <div className="fields-grid">
            {BASE_FIELDS.map((field) => (
              <div className="field" key={field.key}>
                <label>{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={data[field.key as keyof PersonalInfoData] || ""}
                  onChange={(e) =>
                    updateField(field.key as keyof PersonalInfoData, e.target.value)
                  }
                />
              </div>
            ))}

            {activeFields.map((key) => {
              const f = OPTIONAL_FIELDS.find((o) => o.key === key);
              if (!f) return null;

              if (key === "custom") {
                return (
                  <div className="field optional" key={key}>
                    <div className="custom-label-row">
                      <span
                        ref={labelRef}
                        className="custom-label inline-editable"
                        onClick={enableInlineEdit}
                        onBlur={handleInlineBlur}
                        suppressContentEditableWarning
                      >
                        {customLabel}
                      </span>
                      <FiEdit2 onClick={enableInlineEdit} className="edit-icon" />
                    </div>

                    <div className="input-remove">
                      <input
                        type="text"
                        placeholder="Valor..."
                        value={data.customValue || ""}
                        onChange={(e) => updateField("customValue", e.target.value)}
                      />
                      <button className="remove-btn" onClick={() => toggleField(key)}>
                        <FiX />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div className="field optional" key={key}>
                  <label>{f.label}</label>
                  <div className="input-remove">
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={data[key as keyof PersonalInfoData] || ""}
                      onChange={(e) =>
                        updateField(key as keyof PersonalInfoData, e.target.value)
                      }
                    />
                    <button className="remove-btn" onClick={() => toggleField(key)}>
                      <FiX />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="personalinfo-section__addfields">
            {OPTIONAL_FIELDS.filter((f) => !activeFields.includes(f.key)).map((f) => (
              <button key={f.key} onClick={() => toggleField(f.key)}>
                <FiPlus /> {f.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalInfoSection;
