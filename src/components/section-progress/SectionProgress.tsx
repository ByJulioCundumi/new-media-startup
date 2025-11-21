import "./sectionprogress.scss";
import { GrGrow } from "react-icons/gr";
import { MdFormatListBulletedAdd, MdOutlineWorkOutline } from "react-icons/md";
import { PiIdentificationBadge, PiStudentLight } from "react-icons/pi";
import { IoChevronUp, IoChevronDown, IoEyeOutline } from "react-icons/io5";
import { RiDraggable } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { LuEyeClosed } from "react-icons/lu";
import AddSections from "../../pages/create-cv/add-sections/AddSection";

function SectionProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [addSections, setAddSections] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    containerRef.current?.scrollBy({ top: -150, behavior: "smooth" });
  };

  const scrollDown = () => {
    containerRef.current?.scrollBy({ top: 150, behavior: "smooth" });
  };

  useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (mainRef.current && !mainRef.current.contains(e.target as Node)) {
      setAddSections(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  /* ─────────────────────────────────────────────────── */
  /* LOGICA PARA ARRASTRAR EL COMPONENTE                 */
  /* ─────────────────────────────────────────────────── */
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const startDragging = (e: React.MouseEvent) => {
    const rect = dragRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  /* ─────────────────────────────────────────────────── */

  return (
    <div
      ref={mainRef}
      className="section-progress"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {/* Contenedor superior (zona para arrastrar) */}
      <div
        className="section-progress__arrow-container section-progress__arrow-container--up section-progress__drag-area"
        ref={dragRef}
        onMouseDown={startDragging}
      >
        <RiDraggable className="section-progress__drag-icon" />
        <span className="section-progress__arrow-text">7 Secciones</span>

        <div className="section-progress__arrow-box">
          <button className="section-progress__arrow-btn" onClick={scrollUp}>
            <IoChevronUp className="section-progress__arrow-icon" />
          </button>

          <button className="section-progress__arrow-btn" onClick={scrollDown}>
            <IoChevronDown className="section-progress__arrow-icon" />
          </button>
        </div>
      </div>

      {/* Lista scrollable */}
      <div className="section-progress__list" ref={containerRef}>
        <div className="section-progress__item">
          <div className="section-progress__item--box section-progress__item--box-first">
            <div className="section-progress__icon">
              <PiIdentificationBadge />
            </div>
            <span className="section-progress__label">20% / Sobre Mi</span>
          </div>
          {true ? <IoEyeOutline className="section-progress__eye"/> : <LuEyeClosed className="section-progress__eye"/>}
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <RiDraggable className="section-progress__drag-icon" />
            <div className="section-progress__icon">
              <MdOutlineWorkOutline />
            </div>
            <span className="section-progress__label">8% / Perfil</span>
          </div>
          {true ? <IoEyeOutline className="section-progress__eye"/> : <LuEyeClosed className="section-progress__eye"/>}
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <RiDraggable className="section-progress__drag-icon" />
            <div className="section-progress__icon">
              <GrGrow />
            </div>
            <span className="section-progress__label">37% / Experiencia</span>
          </div>
          {true ? <IoEyeOutline className="section-progress__eye"/> : <LuEyeClosed className="section-progress__eye"/>}
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <RiDraggable className="section-progress__drag-icon" />
            <div className="section-progress__icon">
              <PiStudentLight />
            </div>
            <span className="section-progress__label">25% / Educación</span>
          </div>
          {true ? <IoEyeOutline className="section-progress__eye"/> : <LuEyeClosed className="section-progress__eye"/>}
        </div>

      </div>

      {/* Contenedor inferior */}
      <div className="section-progress__arrow-container section-progress__arrow-container--down to-click" onClick={()=>setAddSections(!addSections)}>
        <span className="section-progress__arrow-text"><MdFormatListBulletedAdd /> Agregar sección</span>
        <span>0/7</span>
      </div>
      {addSections && <AddSections/>}
    </div>
  );
}

export default SectionProgress;
