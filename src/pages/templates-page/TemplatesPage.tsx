// TemplatesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import "./templatespage.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { CategorySelector } from "../../components/category-selector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import SearchBar from "../../components/search-bar/SearchBar";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { setSidebar } from "../../reducers/sidebarSlice";
import type { IState } from "../../interfaces/IState";
import { setCreateCvPopup, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import {
  getFavoriteTemplatesApi,
  addFavoriteTemplateApi,
  removeFavoriteTemplateApi,
} from "../../api/user";
import { setFavorites, setUser } from "../../reducers/userSlice";
import Footer from "../../components/footer/Footer";
import { MdOutlineDiamond } from "react-icons/md";
import { BsPatchCheck } from "react-icons/bs";
import { HiCheck } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { RiFileEditLine } from "react-icons/ri";
import Invitation from "../../components/invitation/Invitation";
import JobOffer from "../../components/job-offer/JobOffer";
import { setAllowQrCode } from "../../reducers/identitySlice";

export default function TemplatesPage() {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: IState) => state.user.logged);
  const userFavorites = useSelector((state: IState) => state.user.favoriteTemplates || []);
  const selectedTemplateId = useSelector((state: IState) => state.cvCreation.selectedTemplateId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // ← Ahora es array
  const [showFavorites, setShowFavorites] = useState(false);
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);

  // Cargar favoritos locales cuando no hay sesión
  useEffect(() => {
    if (!isLogged) {
      const saved = localStorage.getItem("localFavorites");
      if (saved) {
        setLocalFavorites(JSON.parse(saved));
      }
    } else {
      setLocalFavorites([]); // Limpiar si está logueado
    }
  }, [isLogged]);

  // Cargar favoritos del backend al montar (solo si logueado)
  useEffect(() => {
    if (isLogged) {
      const loadFavorites = async () => {
        try {
          await getFavoriteTemplatesApi(); // La API ya actualiza Redux (asumiendo que lo hace)
        } catch (err) {
          console.error("Error cargando favoritos:", err);
        }
      };
      loadFavorites();
    }
  }, [isLogged]);

  // Toggle favorito
  const toggleFavorite = async (templateId: string) => {
  if (!isLogged) {
    // Offline: localStorage
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

    // ← ¡AQUÍ ESTÁ LA CLAVE! Actualizar Redux con el nuevo array
    dispatch(setFavorites(updatedFavorites));

  } catch (err) {
    console.error("Error actualizando favorito:", err);
    alert("Error al actualizar favoritos. Intenta de nuevo.");
  }
};

  // Filtrado de plantillas
  const filteredTemplates = useMemo(() => {
    const currentFavorites = isLogged ? userFavorites : localFavorites;

    return templates.filter((tpl) => {
      // Búsqueda por nombre o categoría
      const matchesSearch =
        tpl.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtro por categorías seleccionadas (múltiples)
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => tpl.categories.includes(cat));

      // Filtro por favoritos
      const matchesFavorites = !showFavorites || currentFavorites.includes(tpl.id);

      return matchesSearch && matchesCategories && matchesFavorites;
    });
  }, [searchQuery, selectedCategories, showFavorites, userFavorites, localFavorites, isLogged]);

  const handleSelect = (id: string) => {
    dispatch(setSelectedTemplateId(id));
    dispatch(setCreateCvPopup(true));
  };

  useEffect(() => {
    dispatch(setSidebar("templates"));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(setAllowQrCode(true))
  
    return ()=>{
      dispatch(setAllowQrCode(false))
    }
  },[])

  return (
    <>
      <section className="templates-page">
      <div className="templates-page__info">
        <h2>Plantillas de CV</h2>
        <p>Elige la plantilla perfecta para destacar tu perfil profesional.</p>
      </div>

      {/* TOP BAR */}
      <div className="tp-topbar">
        <CategorySelector
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
        <SearchBar
          textHolder="Buscar plantillas..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <button
          className={`tp-fav-toggle ${showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <IoStar className={showFavorites ? "filled" : ""} />
          {showFavorites ? "Todas" : "Favoritos"}
        </button>
      </div>

      {/* GRID DE PLANTILLAS */}
      <div className="tp-grid">
        {filteredTemplates.length === 0 ? (
          <p className="no-templates">No se encontraron plantillas con los filtros aplicados.</p>
        ) : (
          filteredTemplates.map((tpl) => {
            const Component = tpl.component;
            const currentFavorites = isLogged ? userFavorites : localFavorites;
            const isFavorite = currentFavorites.includes(tpl.id);
            const isSelected = selectedTemplateId === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`tpl-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(tpl.id)}
              >
                <div className="tpl-preview-wrapper">
                  <div className="tpl-hover-overlay">
                    <span>Usar esta plantilla</span>
                  </div>

                  <button
                    className={`tpl-fav-icon ${isFavorite ? "filled" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tpl.id);
                    }}
                    title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    {isFavorite ? <IoStar /> : <IoStarOutline />}
                  </button>

                  {
                    tpl.categories.includes("Premium") && <span className="tag-p"><MdOutlineDiamond size={15}/> Premium</span>
                  }
                  
                  {
                    tpl.categories.includes("Gratis") && <span className="tag-p"><RiFileEditLine size={14}/> Gratis</span>
                  }

                  <div className="tpl-preview">
                    <Component {...mockTemplateData} />
                  </div>
                  <div className="tpl-preview__data">
                    <h3 className="tpl-title">{tpl.label}</h3>
                    <p className="tpl-category">{tpl.categories.join(" • ")}</p>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
      <JobOffer/>
    </section>
      <Footer/>
    </>
  );
}