import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiCamera, FiTrash2, FiChevronDown } from "react-icons/fi";

import "./identitysection.scss";
import type { IState } from "../../../interfaces/IState";

import {
  setPhoto,
  removePhoto,
  setFirstName,
  setLastName,
  setJobTitle,
} from "../../../reducers/identitySlice";

import {
  setSectionProgress,
} from "../../../reducers/cvSectionsSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { toggleSectionOpen } from "../../../reducers/editorsSlice";
import { deleteCvPhotoApi, uploadCvPhotoApi } from "../../../api/cv";
import { hasValidSubscriptionTime } from "../../../util/checkSubscriptionTime";

const IdentitySection = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const identity = useSelector((state: IState) => state.identity);
  const {subscriptionExpiresAt} = useSelector((state: IState) => state.user);

  const {selectedCvId, cvPhoto} = useSelector((state: IState) => state.cvCreation);

  const sectionEditorState = useSelector((state: IState) =>
    state.cvSectionsEditors.sections.find((s) => s.name === "identitySection")
  );

  const isOpen = sectionEditorState?.isOpen ?? false;

  // --------------------------
  //  CALCULAR PROGRESO (sin foto)
  // --------------------------
  const progress = useMemo(() => {
    const fields = [
      identity.firstName?.trim(),
      identity.lastName?.trim(),
      identity.jobTitle?.trim(),
    ];

    const filled = fields.filter(Boolean).length;

    // Cada uno vale 33.33%
    return Math.round((filled / 3) * 100);
  }, [identity.firstName, identity.lastName, identity.jobTitle]);

  // Evitar despachos repetidos
  const lastProgressRef = useRef(-1);

  useEffect(() => {
    if (progress !== lastProgressRef.current) {
      lastProgressRef.current = progress;
      dispatch(setSectionProgress({ name: "identitySection", progress }));
    }
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  useEffect(() => {
      if(cvPhoto !== ""){
        dispatch(setPhoto(cvPhoto))
      }
  }, []);

  // --------------------------
  //  SUBIR FOTO
  // --------------------------
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if(hasValidSubscriptionTime(subscriptionExpiresAt)){
    try {
      const { cvPhoto } = await uploadCvPhotoApi(selectedCvId, file); // cvId del estado o params
      dispatch(setPhoto(cvPhoto));
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      // Manejar error (toast?)
    }
  } else {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setPhoto(reader.result as string));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  }
};

const deleteCvPhoto = async()=>{
    if(cvPhoto !== ""){
      await deleteCvPhotoApi(selectedCvId)
    }
    dispatch(removePhoto());
}

  return (
    <div className={`identity-section ${!isOpen ? "closed" : ""}`}>
      <div className="identity-section__header">
        <h2>
          <FaRegUserCircle /> Sobre Mi
        </h2>

        <div className={`progress-indicator-box ${progressColorClass}`}>
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
                {identity.photo ? (
                  <>
                    <img
                      src={identity.photo}
                      alt="Perfil"
                      className="identity-section__photo-preview"
                    />
                    <button
                      className="identity-section__remove-btn"
                      onClick={() => {
                        deleteCvPhoto()
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
              {identity.allowCvPhoto === true && (
                <button
                  className="add-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiCamera />
                  {identity.photo ? "Cambiar Foto" : "Subir Foto"}
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

            {/* FORMULARIO */}
            <div className="identity-inputs">
              <label>
                Nombre
                <input
                  type="text"
                  value={identity.firstName}
                  onChange={(e) => dispatch(setFirstName(e.target.value))}
                  placeholder="Ej: Julio"
                />
              </label>

              <label>
                Apellidos
                <input
                  type="text"
                  value={identity.lastName}
                  onChange={(e) => dispatch(setLastName(e.target.value))}
                  placeholder="Ej: Cespedes"
                />
              </label>

              <label>
                Puesto Deseado
                <input
                  type="text"
                  value={identity.jobTitle}
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
