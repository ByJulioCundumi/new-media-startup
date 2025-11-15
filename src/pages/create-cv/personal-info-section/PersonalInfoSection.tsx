import React, { useState } from "react";
import {
  FiPlus,
  FiX,
  FiCamera,
  FiUser,
  FiEdit2,
  FiChevronUp,
} from "react-icons/fi";
import "./personalinfosection.scss";

const OPTIONAL_FIELDS = [
  { key: "address", label: "Dirección", placeholder: "Ej: Calle 123 #45" },
  { key: "postalCode", label: "Código Postal", placeholder: "Ej: 110111" },
  { key: "birthDate", label: "Fecha de Nacimiento", placeholder: "DD/MM/AAAA" },
  { key: "nationality", label: "Nacionalidad", placeholder: "Ej: Colombiana" },
  { key: "civilStatus", label: "Estado Civil", placeholder: "Ej: Soltero(a)" },
  { key: "drivingLicense", label: "Carné de Conducir", placeholder: "Ej: A2 / B1" },
  { key: "website", label: "Sitio Web", placeholder: "https://tusitio.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/usuario" },
  { key: "custom", label: "Campo Personalizado", placeholder: "" },
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
  drivingLicense?: string;
  website?: string;
  linkedin?: string;

  customLabel?: string;
  customValue?: string;
}

interface PersonalInfoSectionProps {
  initialData?: PersonalInfoData;
  onChange?: (data: PersonalInfoData) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  initialData,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
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

  const [activeFields, setActiveFields] = useState<string[]>([]);
  const [customLabel, setCustomLabel] = useState("Campo personalizado");
  const [editCustomLabel, setEditCustomLabel] = useState(false);

  const updateField = (field: keyof PersonalInfoData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onChange?.(newData);
  };

  const toggleField = (key: string) => {
    if (activeFields.includes(key)) {
      setActiveFields((prev) => prev.filter((f) => f !== key));

      if (key === "custom") {
        updateField("customValue", "");
        updateField("customLabel", "Campo personalizado");
        setCustomLabel("Campo personalizado");
      } else {
        updateField(key as keyof PersonalInfoData, "");
      }
    } else {
      setActiveFields((prev) => [...prev, key]);
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
      <div className="personalinfo-section__header">
        <h2>Información Personal</h2>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FiChevronUp />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="personalinfo-section__grid">
            <div className="personalinfo-section__photo">
              <div className="photo-wrapper">
                {data.photo ? (
                  <img src={data.photo} alt="Foto de perfil" />
                ) : (
                  <div className="placeholder">
                    <FiUser />
                  </div>
                )}

                <label className="photo-upload">
                  <FiCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            </div>

            <div className="personalinfo-section__fields">
              {[
                { key: "firstName", label: "Nombre", placeholder: "Ej: Carlos" },
                { key: "lastName", label: "Apellidos", placeholder: "Ej: López Gómez" },
                {
                  key: "desiredJob",
                  label: "Puesto deseado",
                  placeholder: "Ej: Desarrollador Frontend",
                },
                {
                  key: "email",
                  label: "Correo electrónico",
                  placeholder: "Ej: correo@ejemplo.com",
                },
                {
                  key: "phone",
                  label: "Teléfono",
                  placeholder: "Ej: +57 301 0000000",
                },
                { key: "city", label: "Ciudad", placeholder: "Ej: Bogotá, Colombia" },
              ].map((field) => (
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
                const field = OPTIONAL_FIELDS.find((f) => f.key === key);
                if (!field) return null;

                if (key === "custom") {
                  return (
                    <div className="field optional" key={key}>
                      <div className="custom-label-row">
                        {editCustomLabel ? (
                          <input
                            autoFocus
                            type="text"
                            value={customLabel}
                            onChange={(e) => {
                              setCustomLabel(e.target.value);
                              updateField("customLabel", e.target.value);
                            }}
                            onBlur={() => setEditCustomLabel(false)}
                            className="editable-label"
                            placeholder="Título del campo"
                          />
                        ) : (
                          <span className="custom-label" onClick={() => setEditCustomLabel(true)}>
                            {customLabel}
                            <FiEdit2 className="edit-icon" />
                          </span>
                        )}
                      </div>

                      <div className="input-remove">
                        <input
                          type="text"
                          placeholder="Ingresa un valor..."
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
                    <label>{field.label}</label>
                    <div className="input-remove">
                      <input
                        type="text"
                        placeholder={field.placeholder}
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
          </div>

          <div className="personalinfo-section__addfields">
            {OPTIONAL_FIELDS.filter((f) => !activeFields.includes(f.key)).map((field) => (
              <button key={field.key} onClick={() => toggleField(field.key)}>
                <FiPlus /> {field.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalInfoSection;
