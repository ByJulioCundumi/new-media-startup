// TemplatesPage.tsx
import { useEffect, useMemo, useState } from "react";
import "./templatespage.scss";

import { templates } from "../../templates/templates";
import { mockTemplateData } from "../../templates/mockTemplateData";
import { CategorySelector } from "../../components/category-selector/CategorySelector";
import { useDispatch } from "react-redux";
import { setTemplatePopupOpen } from "../../reducers/toolbarOptionSlice";
import SearchBar from "../../components/search-bar/SearchBar";
import ProfileAvatar from "../../components/profile-avatar/ProfileAvatar";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const dispatch = useDispatch()
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(()=>{
    dispatch(setTemplatePopupOpen(true))

    return ()=>{
      dispatch(setTemplatePopupOpen(false))
    }
  },[])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const categoryOK =
        selectedCategory === "all" ||
        tpl.category.includes(selectedCategory);

      const favoriteOK =
        !showFavorites || favorites.includes(tpl.id);

      return categoryOK && favoriteOK;
    });
  }, [selectedCategory, showFavorites, favorites]);

  return (
    <section className="templates-page">

      <div className="templates-page__info">
        <h2>Plantillas de CV</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, cum.</p>
        <button>Crear un CV</button>
      </div>

      {/* 🔝 TOP BAR */}
      <div className="tp-topbar">
          <CategorySelector/>
          <SearchBar textHolder="Buscar Plantillas"/>
      </div>

      {/* 📄 GRID DE PLANTILLAS */}
      <div className="tp-grid">
        {filteredTemplates.map((tpl) => {
          const Component = tpl.component;
          const isFavorite = favorites.includes(tpl.id);

          return (
            <div key={tpl.id} className="tpl-item">

              {/* PREVIEW WRAPPER + ESTRELLA */}
              <div className="tpl-preview-wrapper">

                <div
                  className="tpl-fav-icon"
                  onClick={() => toggleFavorite(tpl.id)}
                >
                  {isFavorite ? "⭐" : "✩"}
                </div>

                <div className="tpl-preview">
                  <Component {...mockTemplateData} />
                </div>
              </div>

              {/* INFORMACIÓN */}
              <h3 className="tpl-title">{tpl.label}</h3>
              <p className="tpl-category">{tpl.category.join(", ")}</p>

            </div>
          );
        })}
      </div>

    </section>
  );
}
