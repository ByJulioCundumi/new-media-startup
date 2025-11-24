// components/section-progress/SectionProgress.tsx
import "./sectionprogress.scss";
import { GrGrow } from "react-icons/gr";
import { MdFormatListBulletedAdd, MdOutlineWorkOutline, MdPendingActions } from "react-icons/md";
import { PiIdentificationBadge, PiStudentLight } from "react-icons/pi";
import { IoChevronUp, IoChevronDown, IoEyeOutline } from "react-icons/io5";
import { LuCheck, LuEyeClosed } from "react-icons/lu";

import { useRef, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import AddSections from "../../pages/create-cv/add-sections/AddSection";
import SortableSection from "../../pages/create-cv/sortable-section/SortableSection";
import type { IState } from "../../interfaces/IState";
import { reorderSections, toggleSectionOpen } from "../../reducers/cvSectionsSlice";
import { BiEditAlt } from "react-icons/bi";

function SectionProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [addSections, setAddSections] = useState(false);

  /* ⭐ Datos reales del store */
  const sections = useSelector((state: IState) => state.cvSections.sections);
  const order = useSelector((state: IState) => state.cvSections.order);

  /* ⭐ Secciones opcionales (solo estas cuentan 0–7) */
  const OPTIONAL_SECTIONS = [
    "personalInfoSection",
    "linkSection",
    "courseSection",
    "hobbieSection",
    "referenceSection",
    "awardSection",
    "customSection",
  ];

  const enabledOptionalCount = useMemo(
    () =>
      sections.filter(
        (s) => OPTIONAL_SECTIONS.includes(s.name) && s.enabled
      ).length,
    [sections]
  );

  /* ⭐ Secciones habilitadas totales (header) */
  const enabledSectionsCount = sections.filter((s) => s.enabled).length;

  const scrollUp = () =>
    containerRef.current?.scrollBy({ top: -150, behavior: "smooth" });

  const scrollDown = () =>
    containerRef.current?.scrollBy({ top: 150, behavior: "smooth" });

  /* ⭐ Scroll automático al agregar */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [enabledSectionsCount]);

  /* Cerrar AddSection al hacer clic fuera */
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

  /* ⭐ Drag & Drop para ordenar secciones */
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

  const totalEnabledSections = sections.filter(s => s.enabled);
const overallProgress = totalEnabledSections.length
  ? Math.round(totalEnabledSections.reduce((acc, s) => acc + s.progress, 0) / totalEnabledSections.length)
  : 0;

const progressColorClass = useMemo(() => {
  if (overallProgress < 50) return "progress-red";
  if (overallProgress < 100) return "progress-yellow";
  return "progress-blue";
}, [overallProgress]);


  return (
    <div ref={mainRef} className="section-progress">
      
      <div className="section-progress__header">
  <div className="section-progress__header--box">
    <span className="section-progress__label">Mi CV</span>
    <span className="section-progress__label">{overallProgress}%</span>
  </div>
  <div className="section-progress-bar">
    <div
      className={`progress-bar-fill ${progressColorClass}`}
      style={{ width: `${overallProgress}%` }}
    />
  </div>
</div>



      {/* LISTA DE SECCIONES */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="section-progress__list" ref={containerRef}>
            {order.map((name) => {
              const sec = sections.find((s) => s.name === name);
              if (!sec || !sec.enabled) return null;

              return (
                <SortableSection key={sec.name} id={sec.name}>
                  <div className={`section-progress__item ${getProgressClass(sec.progress)}`}>
                    <span className={`section-progress__label`}>{sec.title}</span>
                    {/* 🔹 Íconos actualizados en base a isEditorOpen */}
                    {
                      sec.progress === 100 ? (
                        <LuCheck className="section-progress__eye" />
                      ) : sec.isEditorOpen ? (
                        <BiEditAlt
                          className="section-progress__eye"
                          onClick={() => dispatch(toggleSectionOpen(sec.name))}
                        />
                      ) : (
                        <LuEyeClosed
                          className="section-progress__eye"
                          onClick={() => dispatch(toggleSectionOpen(sec.name))}
                        />
                      )
                    }                   
                  </div>
                </SortableSection>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* ⭐ FOOTER — solo las 7 opcionales */}
      <div
        className="section-progress__arrow-container section-progress__arrow-container--down to-click"
        onClick={() => setAddSections(!addSections)}
      >
        <span className="section-progress__arrow-text">
          <MdFormatListBulletedAdd /> Más Secciones
        </span>

        <span className="section-progress__count">{enabledOptionalCount}/7</span>
      </div>

      {addSections && <AddSections />}
    </div>
  );
}

export default SectionProgress;
