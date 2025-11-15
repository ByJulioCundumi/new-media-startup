import React from "react";
import "./DashboardCVs.scss";

import { FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { TbFileCv } from "react-icons/tb";
import { MdFileDownload } from "react-icons/md";

const DashboardCVs: React.FC = () => {
  // 🔹 MOCK DE EJEMPLO
  const cvs = [
    {
      id: 1,
      titulo: "Curriculum Profesional",
      creado: "18 Ene 2025",
      actualizado: "19 Ene 2025",
      progreso: 12,
    },
  ];

  const noCVs = cvs.length === 0;

  return (
    <div className="dashboardcvs">
      <div className="dashboardcvs__start">
        {/* -------- TOP HEADER -------- */}
      <div className="dashboardcvs__top">
        <h2 className="dashboardcvs__title">Mis CVs</h2>
        <p className="dashboardcvs__subtitle">Tienes {cvs.length} CV</p>
      </div>

      {/* -------- BOTÓN CREAR -------- */}
      <button className="dashboardcvs__new-btn">
        Crear Nuevo <FiPlus />
      </button>
      </div>

      {/* -------- ESTADO VACÍO -------- */}
      {noCVs && (
        <div className="dashboardcvs__empty">
          <div className="dashboardcvs__empty-icon">📄</div>

          <h3 className="dashboardcvs__empty-title">Aún no tienes CVs</h3>

          <p className="dashboardcvs__empty-text">
            Aún no has creado ningún currículum. Comienza a construir
            tu CV profesional ahora mismo.
          </p>

          <button className="dashboardcvs__empty-button">
            Crear mi primer CV
          </button>
        </div>
      )}

      {/* -------- GRID DE TARJETAS -------- */}
      {!noCVs && (
        <div className="dashboardcvs__grid">

          {/* Tarjeta para crear nuevo */}
          <div className="dashboardcvs__card dashboardcvs__card--new">
            <div className="new-icon">
              <FiPlus />
            </div>
            <h3>Crear Nuevo CV</h3>
            <p>Comienza a construir tu carrera</p>
          </div>

          {/* Tarjeta de CVs existentes */}
          {cvs.map((cv) => (
            <div className="dashboardcvs__card" key={cv.id}>
              <div className="dashboardcvs__card-header">
                <TbFileCv className="card-icon" />
                <span className="progress-pill">{cv.progreso}%</span>
              </div>

              <h3 className="dashboardcvs__card-title">{cv.titulo}</h3>

              <div className="dashboardcvs__card-actions">
                <button><FiEdit3 /></button>
                <button><FiTrash2 /></button>
                <button><MdFileDownload /></button>
              </div>

              <div className="dashboardcvs__card-meta">
                <p>Creado: {cv.creado}</p>
                <p>Actualizado: {cv.actualizado}</p>
              </div>

              <div className="dashboardcvs__card-progress">
                <div
                  className="bar"
                  style={{ width: `${cv.progreso}%` }}
                ></div>
              </div>

              <span className="dashboardcvs__card-progress-label">
                {cv.progreso}% Completado
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCVs;
