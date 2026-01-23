// components/section-progress/SectionProgress.tsx
import "./sectionprogress.scss";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { LuCheck, LuEyeClosed } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { FaSave } from "react-icons/fa";

import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import AddSections from "../../pages/create-cv/add-sections/AddSection";
import SortableSection from "../../pages/create-cv/sortable-section/SortableSection";
import type { IState } from "../../interfaces/IState";
import { reorderSections } from "../../reducers/cvSectionsSlice";
import { setSelectedCvTitle } from "../../reducers/cvCreationSlice";
import { toggleSectionOpen } from "../../reducers/editorsSlice";

function SectionProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [addSections, setAddSections] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // ← Nuevo estado para móvil

  /* Datos reales del store */
  const sections = useSelector((state: IState) => state.cvSections.sections);
  const sectionsEditor = useSelector((state: IState) => state.cvSectionsEditors.sections);
  const order = useSelector((state: IState) => state.cvSections.order);
  const { selectedCvTitle } = useSelector((state: IState) => state.cvCreation);
  const { sidebarOption } = useSelector((state: IState) => state.sidebar);

  const enabledSectionsCount = sections.filter((s) => s.enabled).length;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [enabledSectionsCount]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mainRef.current && !mainRef.current.contains(e.target as Node)) {
        setAddSections(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    dispatch(reorderSections({ from: oldIndex, to: newIndex }));
  };

  const getProgressClass = (value: number) => {
    if (value < 50) return "section-progress-red";
    if (value < 100) return "section-progress-yellow";
    return "section-progress-blue";
  };

  const [editing, setEditing] = useState(false);

  const handleEditTitle = () => setEditing(true);
  const handleSaveTitle = () => {
    if (!selectedCvTitle.trim()) dispatch(setSelectedCvTitle("Titulo del cv"));
    setEditing(false);
  };

  const handleTitleBlur = () => {
    if (!selectedCvTitle.trim()) dispatch(setSelectedCvTitle("Titulo del cv"));
    setEditing(false);
  };

  // Toggle para móvil: botón flotante ↔ panel expandido
  const toggleMobilePanel = () => setIsExpanded((prev) => !prev);

  return (
    <>
      {/* Botón flotante visible SOLO en móvil */}
      {
        sidebarOption !== "home" && <button
        className="section-progress__fab"
        onClick={toggleMobilePanel}
        aria-label="Gestionar secciones"
      >
        <MdFormatListBulletedAdd />
        <span className="section-progress__fab-count">
          {enabledSectionsCount}/14
        </span>
      </button>
      }

      {/* Panel completo (desktop siempre visible, móvil solo cuando isExpanded) */}
      <div
        ref={mainRef}
        className={
          sidebarOption !== "home"
            ? `section-progress ${isExpanded ? "section-progress--expanded" : "section-progress--collapsed"}`
            : "section-progress-home"
        }
      >
        {/* Header con título editable */}
        <div className="section-progress__header">
          <div className="toolbar-cv-header">
            <div className="toolbar-cv-header__main">
              {editing ? (
                <input
                  className="toolbar-cv-title-input editing"
                  value={selectedCvTitle}
                  onChange={(e) => dispatch(setSelectedCvTitle(e.target.value))}
                  onBlur={handleTitleBlur}
                  autoFocus
                />
              ) : (
                <h2 className="toolbar-cv-title">
                  {selectedCvTitle || "Titulo del cv"}
                </h2>
              )}

              {editing ? (
                <button
                  className="toolbar-cv-edit-btn save"
                  onClick={handleSaveTitle}
                  title="Guardar título"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  className="toolbar-cv-edit-btn"
                  onClick={handleEditTitle}
                  title="Editar título"
                >
                  <BiEditAlt />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lista de secciones */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="section-progress__list" ref={containerRef}>
              {order.map((name) => {
                const sec = sections.find((s) => s.name === name);
                const secEditor = sectionsEditor.find((s) => s.name === name);
                if (!sec || !secEditor || !sec.enabled) return null;

                return (
                  <SortableSection key={sec.name} id={sec.name}>
                    <div
                      className={`section-progress__item ${getProgressClass(
                        sec.progress
                      )}`}
                    >
                      <span className="section-progress__label">
                        {sec.title}
                      </span>
                      {sec.progress === 100 ? (
                        <LuCheck style={{color: "#0dd1b0"}} className="section-progress__eye" />
                      ) : secEditor.isEditorOpen ? (
                        <BiEditAlt
                          className="section-progress__eye"
                          onClick={() => dispatch(toggleSectionOpen(sec.name))}
                        />
                      ) : (
                        <LuEyeClosed
                          className="section-progress__eye"
                          onClick={() => dispatch(toggleSectionOpen(sec.name))}
                        />
                      )}
                    </div>
                  </SortableSection>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>

        {/* Botón de agregar secciones (dentro del panel) */}
        <div
          className="section-progress__arrow-container section-progress__arrow-container--down to-click"
          onClick={() => setAddSections(!addSections)}
        >
          <span className="section-progress__arrow-text">
            <MdFormatListBulletedAdd /> Secciones
          </span>
          <span className="section-progress__count">
            {enabledSectionsCount}/14
          </span>
        </div>

        {addSections && <AddSections />}
      </div>
    </>
  );
}

export default SectionProgress;