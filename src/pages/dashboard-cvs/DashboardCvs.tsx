// DashboardCVs.tsx
import React, { useEffect } from "react";
import "./DashboardCVs.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { useDispatch } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import ProfileAvatar from "../../components/profile-avatar/ProfileAvatar";
import { setSidebar } from "../../reducers/sidebarSlice";

const mockUserCVs = [
  {
    id: "cv1",
    title: "CV Principal",
    templateId: "tokyo",
    createdAt: "2024-11-10",
  },
  {
    id: "cv2",
    title: "CV Inglés",
    templateId: "roma",
    createdAt: "2024-12-01",
  }
];

export default function DashboardCVs() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSidebar("cvs"))
  },[])

  return (
    <div className="dashboard-cvs">

      <div className="dashboard-header">
        <h1>Mis Currículums</h1>
        <p>Administra, visualiza o crea fácilmente nuevos CVs.</p>
      </div>

      {/* 🔹 Tarjeta Crear Nuevo */}
      <div className="cv-item create-new" onClick={()=> dispatch(setTemplatePopupOpen(true))}>
        <div className="create-box">
          <span className="plus">+</span>
          <p>Crear nuevo CV</p>
        </div>
      </div>

      {/* 🔹 Lista de CVs */}
      {mockUserCVs.map((cv) => {
        let tpl = templates.find((t) => t.id === cv.templateId);
        if (!tpl) tpl = templates[0];

        const Component = tpl.component;

        return (
          <div key={cv.id} className="cv-item">

            <div className="cv-menu">
              <span>•••</span>
            </div>

            <div className="cv-preview">
              <div className="cv-preview-scale">
                <Component {...mockTemplateData} />
              </div>
            </div>

            <div className="cv-info">
              <h3>{cv.title}</h3>
              <p>Plantilla: {tpl.label}</p>
              <span className="date">Creado el {cv.createdAt}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
