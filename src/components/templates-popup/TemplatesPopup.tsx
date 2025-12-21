// components/templates-popup/TemplatesPopup.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./templatespopup.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { IoClose, IoShieldCheckmarkOutline, IoStar, IoStarOutline } from "react-icons/io5";
import SearchBar from "../search-bar/SearchBar";
import { CategorySelector } from "../category-selector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import type { IState } from "../../interfaces/IState";
import { setCreateCvPopup, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import {
  getFavoriteTemplatesApi,
  addFavoriteTemplateApi,
  removeFavoriteTemplateApi,
} from "../../api/user";
import { setFavorites } from "../../reducers/userSlice";
import { MdOutlineCheck, MdOutlineCreditCardOff, MdOutlineDiamond } from "react-icons/md";
import { Sparkles } from "lucide-react";
import { BsPatchCheck } from "react-icons/bs";

export default function TemplatesPopup() {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: IState) => state.user.logged);
  const userFavorites = useSelector((state: IState) => state.user.favoriteTemplates || []);
  const selectedTemplateId = useSelector((state: IState) => state.cvCreation.selectedTemplateId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);

  const popupRef = useRef<HTMLDivElement>(null);

  // Cargar favoritos locales si no está logueado
  useEffect(() => {
    if (!isLogged) {
      const saved = localStorage.getItem("localFavorites");
      if (saved) {
        setLocalFavorites(JSON.parse(saved));
      }
    } else {
      setLocalFavorites([]);
    }
  }, [isLogged]);

  // Cargar favoritos del backend al abrir el popup (solo logueado)
  useEffect(() => {
    if (isLogged) {
      const loadFavorites = async () => {
        try {
          await getFavoriteTemplatesApi(); // Asumiendo que actualiza Redux internamente
        } catch (err) {
          console.error("Error cargando favoritos en popup:", err);
        }
      };
      loadFavorites();
    }
  }, [isLogged]);

  // Toggle favorito (igual que en TemplatesPage)
  const toggleFavorite = async (templateId: string) => {
    if (!isLogged) {
      const updated = localFavorites.includes(templateId)
        ? localFavorites.filter((id) => id !== templateId)
        : [...localFavorites, templateId];
      setLocalFavorites(updated);
      localStorage.setItem("localFavorites", JSON.stringify(updated));
      return;
    }

    try {
      const isFavorite = userFavorites.includes(templateId);
      let updatedFavorites: string[];

      if (isFavorite) {
        updatedFavorites = await removeFavoriteTemplateApi(templateId);
      } else {
        updatedFavorites = await addFavoriteTemplateApi(templateId);
      }

      dispatch(setFavorites(updatedFavorites));
    } catch (err) {
      console.error("Error actualizando favorito:", err);
      alert("Error al actualizar favoritos");
    }
  };

  // Filtrado idéntico al de TemplatesPage
  const filteredTemplates = useMemo(() => {
    const currentFavorites = isLogged ? userFavorites : localFavorites;

    return templates.filter((tpl) => {
      const matchesSearch =
        tpl.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => tpl.categories.includes(cat));

      const matchesFavorites = !showFavorites || currentFavorites.includes(tpl.id);

      return matchesSearch && matchesCategories && matchesFavorites;
    });
  }, [searchQuery, selectedCategories, showFavorites, userFavorites, localFavorites, isLogged]);

  const handleSelect = (id: string) => {
    dispatch(setSelectedTemplateId(id));
  };

  const handleContinue = () => {
    if (selectedTemplateId) {
      dispatch(setCreateCvPopup(true));
    }
  };

  return (
    <div className="template-popup-overlay">
      <div ref={popupRef} className="template-popup popup-animate">
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

        {/* FILTROS FIJOS */}
        <div className="template-popup-filters-fixed">
          <CategorySelector
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          <SearchBar
            textHolder="Buscar plantilla..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <button
            className={`fav-filter ${showFavorites ? "active" : ""}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? <IoStar className="filled" /> : <IoStarOutline />}
            {showFavorites ? "Todas" : "Favoritos"}
          </button>
        </div>

        {/* GRID SCROLLABLE */}
        <div className="template-popup-scroll">
          <div className="template-popup-grid">
            {filteredTemplates.length === 0 ? (
              <p className="no-results">No se encontraron plantillas</p>
            ) : (
              filteredTemplates.map((tpl) => {
                const Component = tpl.component;
                const currentFavorites = isLogged ? userFavorites : localFavorites;
                const isFavorite = currentFavorites.includes(tpl.id);
                const isSelected = selectedTemplateId === tpl.id;

                return (
                  <div
                    key={tpl.id}
                    className={`template-popup-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelect(tpl.id)}
                  >
                    <div className="template-popup-preview-wrapper">
                      {/* Overlay hover */}
                      <div className="template-popup-hover-overlay">
                        <span>Seleccionar</span>
                      </div>

                      {/* Overlay seleccionado */}
                      {isSelected && (
                        <div className="template-popup-selected-overlay">
                          <span>Seleccionada</span>
                        </div>
                      )}

                      {/* Favorito */}
                      <button
                        className={`template-popup-fav-icon ${isFavorite ? "filled" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tpl.id);
                        }}
                        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        {isFavorite ? <IoStar /> : <IoStarOutline />}
                      </button>

                      {
                        tpl.categories.includes("Premium") && <span className="tag"><MdOutlineDiamond size={15}/> Premium</span>
                      }

                      {
                        tpl.categories.includes("Gratis") && <span className="tag"><BsPatchCheck size={14}/> Gratis</span>
                      }

                      {/* Preview */}
                      <div className="template-popup-preview">
                        <Component {...mockTemplateData} />
                      </div>
                    </div>

                    <div className="template-preview__data">
                      <h3 className="template-popup-title">{tpl.label}</h3>
                      <p className="template-popup-category">
                        {tpl.categories.join(" • ")}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* BOTÓN CONTINUAR FIJO */}
        {selectedTemplateId && (
          <div className="template-popup-btn-container">
            <button
              className="template-popup-continue-btn"
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}