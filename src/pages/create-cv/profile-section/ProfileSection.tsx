import "./profileSection.scss";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { setProfileContent } from "../../../reducers/profileSlice";
import {
  setSectionProgress,
  toggleSectionOpen,
  updateSectionTitle,
} from "../../../reducers/cvSectionsSlice";
import RichTextEditor from "../../../components/rich-text-editor/RichTextEditor";

export default function ProfileSection() {
  const dispatch = useDispatch();

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "profileSection")
  );

  const isOpen = sectionState?.isOpen ?? false;
  const title = sectionState?.title ?? "Perfil";

  // Contenido del perfil desde Redux
  const content = useSelector((state: IState) => state.profileSection);

  // Estado local para edición del título
  const [editingTitle, setEditingTitle] = useState(false);

  // Manejador para guardar en Redux
  const handleContentChange = (html: string) => {
    dispatch(setProfileContent(html));
  };

  // Cálculo del progreso (100% si hay texto, 0% si está vacío)
  const progress = useMemo(() => {
    const text = content
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    return text.length > 0 ? 100 : 0;
  }, [content]);

  const progressColorClass = useMemo(() => {
    if (progress < 50) return "progress-red";
    if (progress < 100) return "progress-yellow";
    return "progress-blue";
  }, [progress]);

  // Guardar progreso en tiempo real
  useEffect(() => {
    dispatch(setSectionProgress({ name: "profileSection", progress }));
  }, [progress, dispatch]);

  return (
    <div className={`profile-section ${isOpen ? "open" : "closed"}`}>
      <div className="profile-section__header">
        {/* Título editable */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2 className="title-display" onClick={() => setEditingTitle(true)}>
              <MdOutlineWorkOutline /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(
                  updateSectionTitle({
                    name: "profileSection",
                    title: e.target.value,
                  })
                )
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>

        <div className={`progress-indicator ${progressColorClass}`}>
          {progress}%
        </div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("profileSection"))}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="profile-section__content">
          {/* Aquí usamos el componente reutilizable */}
          <RichTextEditor
            value={content}
            onChange={handleContentChange}
            placeholder="Redacta tu perfil profesional..."
          />
        </div>
      )}
    </div>
  );
}