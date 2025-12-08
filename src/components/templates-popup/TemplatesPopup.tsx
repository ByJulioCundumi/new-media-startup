import { useMemo, useState, useRef, useEffect } from "react";
import "./templatespopup.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { IoClose, IoStar, IoStarOutline } from "react-icons/io5";
import SearchBar from "../search-bar/SearchBar";
import { CategorySelector } from "../category-selector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import type { IState } from "../../interfaces/IState";
import { setTemplate } from "../../reducers/templateSlice";

export default function TemplatesPopup() {
  const [searchValue, setSearchValue] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const storedTemplate = useSelector((state: IState) => state.template.id);
  const dispatch = useDispatch();

  const popupRef = useRef<HTMLDivElement | null>(null);

  /* ===========================
      Cerrar al hacer clic fuera
  ============================== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        dispatch(setTemplatePopupOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  /* FILTROS */
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesSearch = tpl.label
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesFavorite = !showFavorites || favorites.includes(tpl.id);

      return matchesSearch && matchesFavorite;
    });
  }, [searchValue, showFavorites, favorites]);

  return (
    <div className="template-popup-popup-overlay">
      {/* POPUP */}
      <div ref={popupRef} className="template-popup-popup popup-animate">
        {/* HEADER */}
        <div className="template-popup-header">
          <h2>Selecciona Tu Plantilla</h2>

          <button
            className="close-btn"
            onClick={() => dispatch(setTemplatePopupOpen(false))}
            aria-label="Cerrar"
          >
            <IoClose size={26} />
          </button>
        </div>

        {/* FILTROS */}
        <div className="template-popup-filters-fixed">
          <CategorySelector />

          <SearchBar
            textHolder="Buscar Plantilla"
            value={searchValue}
            onChange={setSearchValue}
          />

          <button
            className={`fav-filter ${showFavorites ? "active" : ""}`}
            onClick={() => setShowFavorites((v) => !v)}
          >
            {showFavorites ? <IoStar /> : <IoStarOutline />}
            Favoritos
          </button>
        </div>

        {/* AREA SCROLL */}
        <div className="template-popup-scroll">
          <div className="template-popup-grid">
            {filteredTemplates.map((tpl) => {
              const Component = tpl.component;
              const isFavorite = favorites.includes(tpl.id);

              return (
                <div
                  key={tpl.id}
                  className={`template-popup-item ${selectedTemplate === tpl.id ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedTemplate(tpl.id);
                    dispatch(setTemplate(tpl.id));
                  }}
                >
                  <div className="template-popup-preview-wrapper">

                    {/* OVERLAY HOVER */}
                    <div className="template-popup-hover-overlay">
                      <span>Seleccionar Plantilla</span>
                    </div>

                    {/* OVERLAY FIJO SELECCIONADA */}
                    {selectedTemplate === tpl.id && (
                      <div className="template-popup-selected-overlay">
                        <span>Plantilla Seleccionada</span>
                      </div>
                    )}

                    {/* FAVORITO */}
                    <div
                      className="template-popup-fav-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tpl.id);
                      }}
                    >
                      {isFavorite ? "⭐" : "✩"}
                    </div>

                    {/* PREVIEW REDUCIDA */}
                    <div className="template-popup-preview">
                      <Component {...mockTemplateData} />
                    </div>
                  </div>

                  {/* INFO */}
                  <h3 className="template-popup-title">{tpl.label}</h3>
                  <p className="template-popup-category">
                    {tpl.categories.join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTÓN FIJO */}
        {selectedTemplate && (
          <div className="template-popup-btn-container">
            <button
              className="template-popup-continue-btn"
              onClick={() => dispatch(setTemplatePopupOpen(false))}
            >
              Comenzar a Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
