// TemplatesPage.tsx
import { useEffect, useMemo, useState } from "react";
import "./templatespage.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { CategorySelector } from "../../components/category-selector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import SearchBar from "../../components/search-bar/SearchBar";
import ProfileAvatar from "../../components/profile-avatar/ProfileAvatar";
import { IoStarOutline } from "react-icons/io5";
import { setSidebar } from "../../reducers/sidebarSlice";
import { setTemplateId } from "../../reducers/templateSlice"; // ✅ Importamos acción
import type { IState } from "../../interfaces/IState";
import { setCreateCvPopup, setSelectedTemplateId } from "../../reducers/cvCreationSlice";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const dispatch = useDispatch();

  const templateIdFromRedux = useSelector((state: IState) => state.cvCreation.selectedTemplateId);

  useEffect(() => {
    dispatch(setSidebar("templates"));
  }, [dispatch]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSelect = (id:string)=>{
    dispatch(setSelectedTemplateId(id))
    dispatch(setCreateCvPopup(true))
  }

  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const categoryOK =
        selectedCategory === "all" || tpl.categories.includes(selectedCategory);

      const favoriteOK = !showFavorites || favorites.includes(tpl.id);

      return categoryOK && favoriteOK;
    });
  }, [selectedCategory, showFavorites, favorites]);

  return (
    <section className="templates-page">
      <div className="templates-page__info">
        <h2>Plantillas de CV</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, cum.</p>
      </div>

      {/* 🔝 TOP BAR */}
      <div className="tp-topbar">
        <CategorySelector />
        <SearchBar textHolder="Buscar Plantillas" />
        <button className="tp-fav-toggle"> <IoStarOutline /> Favoritos</button>
      </div>

      {/* 📄 GRID DE PLANTILLAS */}
      <div className="tp-grid">
        {filteredTemplates.map((tpl) => {
          const Component = tpl.component;
          const isFavorite = favorites.includes(tpl.id);
          const isSelected = templateIdFromRedux === tpl.id; // ✅ Marca la plantilla seleccionada

          return (
            <div
              key={tpl.id}
              className={`tpl-item ${isSelected ? "selected" : ""}`} // ✅ Clase para visual feedback
              onClick={()=> handleSelect(tpl.id)} // ✅ Actualiza templateId en Redux
            >
              {/* PREVIEW WRAPPER + ESTRELLA */}
              <div className="tpl-preview-wrapper">
                {/* OVERLAY HOVER */}
                <div className="tpl-hover-overlay">
                  <span>Seleccionar Plantilla</span>
                </div>

                <div
                  className="tpl-fav-icon"
                  onClick={(e) => {
                    e.stopPropagation(); // evita que el click cierre o seleccione la plantilla
                    toggleFavorite(tpl.id);
                  }}
                >
                  {isFavorite ? "⭐" : "✩"}
                </div>

                <div className="tpl-preview">
                  <Component {...mockTemplateData} />
                </div>
              </div>

              {/* INFORMACIÓN */}
              <h3 className="tpl-title">{tpl.label}</h3>
              <p className="tpl-category">{tpl.categories.join(", ")}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}