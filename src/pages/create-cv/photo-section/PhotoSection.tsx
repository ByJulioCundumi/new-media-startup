import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCamera, FiTrash2, FiChevronDown } from "react-icons/fi";
import "./photosection.scss";
import type { IState } from "../../../interfaces/IState";
import { setPhoto, removePhoto } from "../../../reducers/photoSlice";
import { setSectionProgress, toggleSectionOpen } from "../../../reducers/cvSectionsSlice";

const PhotoSection = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoData = useSelector((state: IState) => state.photo);

  const progress = photoData.src ? 100 : 0;

  const sectionState = useSelector((state: IState) =>
    state.cvSections.find((s) => s.name === "photoSection")
  );

  const isOpen = sectionState?.isOpen ?? false;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setPhoto(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    dispatch(removePhoto());
  };

   // Guardar progreso en tiempo real
  useEffect(() => {
    dispatch(setSectionProgress({ name: "photoSection", progress }));
  }, [progress, dispatch]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue"; // 100%
  }, [progress]);

  return (
    <div className={`photo-section ${!isOpen ? "closed" : ""}`}>
      <div className="photo-section__header">
        <h2><FiCamera /> Foto de Perfil</h2>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={()=> dispatch(toggleSectionOpen("photoSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="photo-section__content">
          <div className="photo-container">
            {photoData.src ? (
              <>
                <img src={photoData.src} alt="Perfil" className="photo-preview" />
                <button className="remove-btn" onClick={handleRemove}>
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

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            hidden
          />

          <button className="add-photo-btn" onClick={() => fileInputRef.current?.click()}>
            <FiCamera /> {photoData.src ? "Cambiar Foto" : "Subir Foto"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoSection;
