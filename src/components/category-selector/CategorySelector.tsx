import React, { useRef } from "react"
import "./categoryselector.scss"
import { FaDeleteLeft } from "react-icons/fa6"

interface ICategorySelectorProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}

const defaultCategories = [
  "Limpio",
  "Minimalista",
  "Moderno",
  "Elegante",
  "Clásico",
  "Visual",
  "Creativo",
  "Profesional",
  "Corporativo",
  "Premium",
  "Editorial",
  "Tipográfico",
  "Colorido",
  "Sobrio",
  "Sencillo",
  "Con foto",
  "Sin foto",
  "Junior",
  "Semi Senior",
  "Senior",
  "Ejecutivo",
  "Gerencial",
  "Freelance",
  "Consultor",
  "Académico",
  "Técnico",
  "Tecnología",
  "Diseño",
  "Marketing",
  "Ventas",
  "Finanzas",
  "Ingeniería",
  "Salud",
  "Educación",
  "Legal",
  "Recursos Humanos",
  "Ciberseguridad",
  "Formal",
  "Disruptivo",
  "Serio",
  "Personal Branding",
  "Primer empleo",
  "Portafolio",
]

export const CategorySelector: React.FC<ICategorySelectorProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleCategory = (category: string) => {
    const isSelected = selectedCategories.includes(category)

    const updatedCategories = isSelected
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    onCategoryChange(updatedCategories)
  }

  const clearSelection = () => {
    onCategoryChange([])
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const { clientWidth } = scrollRef.current
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5,
      behavior: "smooth",
    })
  }

  return (
    <div className="category-selector-wrapper">
      <button
        className="clear-selection-button"
        onClick={clearSelection}
        disabled={selectedCategories.length === 0}
      >
        <FaDeleteLeft className="category-selector__icon" />
      </button>

      <button
        className="category__arrow-button left"
        onClick={() => scroll("left")}
      >
        ‹
      </button>

      <div className="category-selector" ref={scrollRef}>
        {defaultCategories.map((category) => {
          const isActive = selectedCategories.includes(category)

          return (
            <button
              key={category}
              className={`category-button ${isActive ? "active" : ""}`}
              onClick={() => toggleCategory(category)}
              aria-pressed={isActive}
            >
              {category}
            </button>
          )
        })}
      </div>

      <button
        className="category__arrow-button right"
        onClick={() => scroll("right")}
      >
        ›
      </button>
    </div>
  )
}
