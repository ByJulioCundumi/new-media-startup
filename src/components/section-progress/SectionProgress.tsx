import "./sectionprogress.scss";
import { GrGrow } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";
import { PiIdentificationBadge, PiStudentLight } from "react-icons/pi";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { useRef } from "react";

function SectionProgress() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    containerRef.current?.scrollBy({ top: -150, behavior: "smooth" });
  };

  const scrollDown = () => {
    containerRef.current?.scrollBy({ top: 150, behavior: "smooth" });
  };

  return (
    <div className="section-progress">

      {/* Botón superior con texto */}
      <button
        className="section-progress__arrow-btn section-progress__arrow-btn--up"
        onClick={scrollUp}
      >
        <span className="section-progress__arrow-text">0/14 Secciones</span>
        <IoChevronUp className="section-progress__arrow-icon" />
      </button>

      {/* Contenedor scrollable */}
      <div className="section-progress__list" ref={containerRef}>
        
        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <div className="section-progress__icon"><PiIdentificationBadge /></div>
            <span className="section-progress__label">20% / Sobre Mi</span>
          </div>
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <div className="section-progress__icon"><MdOutlineWorkOutline /></div>
            <span className="section-progress__label">8% / Perfil</span>
          </div>
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <div className="section-progress__icon"><GrGrow /></div>
            <span className="section-progress__label">37% / Experiencia</span>  
          </div>
        </div>

        <div className="section-progress__item">
          <div className="section-progress__item--box">
            <div className="section-progress__icon"><PiStudentLight /></div>
            <span className="section-progress__label">25% / Educación</span>
          </div>
        </div>

      </div>

      {/* Botón inferior con texto */}
      <button
        className="section-progress__arrow-btn section-progress__arrow-btn--down"
        onClick={scrollDown}
      >
        <IoChevronDown className="section-progress__arrow-icon" />
        <span className="section-progress__arrow-text">Agregar sección</span>
      </button>

    </div>
  );
}

export default SectionProgress;
