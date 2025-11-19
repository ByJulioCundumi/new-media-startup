import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCamera, FiTrash2, FiChevronDown } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

import "./identitysection.scss";
import type { IState } from "../../../interfaces/IState";

import {
  setPhoto,
  removePhoto,
  setFirstName,
  setLastName,
  setJobTitle,
  resetIdentity, // ⭐ NUEVO
} from "../../../reducers/identitySlice";

import {
  setSectionProgress,
  toggleSectionOpen,
} from "../../../reducers/cvSectionsSlice";

const IdentitySection = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const identity = useSelector((state: IState) => state.identity);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "identitySection")
  );

  const isOpen = sectionState?.isOpen ?? false;

  // -----------------------------
  // 🔥  Progreso (tolerante a estado vacío)
  // -----------------------------
  const progress = useMemo(() => {
    let value = 0;

    if (identity?.photo) value += 25;
    if (identity?.firstName?.trim()) value += 25;
    if (identity?.lastName?.trim()) value += 25;
    if (identity?.jobTitle?.trim()) value += 25;

    return value;
  }, [identity]);

  useEffect(() => {
    dispatch(setSectionProgress({ name: "identitySection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  // -----------------------------
  // 🧹 Reset automático cuando todo está vacío
  // -----------------------------
  useEffect(() => {
    const isAllEmpty =
      (!identity?.photo || identity.photo === null) &&
      (!identity?.firstName || identity.firstName.trim() === "") &&
      (!identity?.lastName || identity.lastName.trim() === "") &&
      (!identity?.jobTitle || identity.jobTitle.trim() === "");

    if (isAllEmpty && Object.keys(identity).length > 0) {
      dispatch(resetIdentity());
    }
  }, [identity, dispatch]);

  // -----------------------------
  // 📸 Upload photo
  // -----------------------------
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setPhoto(reader.result as string));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`identity-section ${!isOpen ? "closed" : ""}`}>
      {/* HEADER */}
      <div className="identity-section__header">
        <h2>
          <FaRegUserCircle /> Sobre Mi
        </h2>

        <div className={`progress-indicator ${progressColorClass}`}>
          {progress}%
        </div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("identitySection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="identity-section__content">
          <div className="identity-flex">
            {/* FOTO */}
            <div className="identity-section__photo-wrapper">
              <div className="identity-section__photo-container">
                {identity?.photo ? (
                  <>
                    <img
                      src={identity.photo}
                      alt="Perfil"
                      className="identity-section__photo-preview"
                    />
                    <button
                      className="identity-section__remove-btn"
                      onClick={() => {
                        dispatch(removePhoto());
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </>
                ) : (
                  <div className="placeholder">
                    <FiCamera />
                    <span>Sin foto</span>
                  </div>
                )}
              </div>

              {/* Botón debajo */}
              {(identity?.allowCvPhoto ?? true) && (
                <button
                  className="add-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiCamera />
                  {identity?.photo ? "Cambiar Foto" : "Subir Foto"}
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                hidden
              />
            </div>

            {/* INPUTS DERECHA */}
            <div className="identity-inputs">
              <label>
                Nombre
                <input
                  type="text"
                  value={identity?.firstName ?? ""}
                  onChange={(e) => dispatch(setFirstName(e.target.value))}
                  placeholder="Ej: Julio"
                />
              </label>

              <label>
                Apellidos
                <input
                  type="text"
                  value={identity?.lastName ?? ""}
                  onChange={(e) => dispatch(setLastName(e.target.value))}
                  placeholder="Ej: Cespedes"
                />
              </label>

              <label>
                Puesto Deseado
                <input
                  type="text"
                  value={identity?.jobTitle ?? ""}
                  onChange={(e) => dispatch(setJobTitle(e.target.value))}
                  placeholder="Ej: Desarrollador Frontend"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentitySection;
