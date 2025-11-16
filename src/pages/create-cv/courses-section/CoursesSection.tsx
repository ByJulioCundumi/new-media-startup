import React, { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiX } from "react-icons/fi";
import "./coursessection.scss";

interface CourseEntry {
  id: string;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  city?: string;
  country?: string;
  link?: string;
  description?: string;
  showLink?: boolean;
}

interface CoursesSectionProps {
  initialData?: CourseEntry[];
  onChange?: (data: CourseEntry[]) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ initialData, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [courses, setCourses] = useState<CourseEntry[]>(initialData || []);

  const addCourse = () => {
    const newCourse: CourseEntry = {
      id: crypto.randomUUID(),
      name: "",
      institution: "",
      startDate: "",
      endDate: "",
      city: "",
      country: "",
      description: "",
      showLink: false,
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    onChange?.(updated);
  };

  const updateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setCourses(updated);
    onChange?.(updated);
  };

  const removeCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    onChange?.(updated);
  };

  const toggleLink = (id: string) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, showLink: !c.showLink, link: c.showLink ? "" : c.link } : c
    );
    setCourses(updated);
  };

  return (
    <div className={`courses-section ${!isOpen ? "closed" : ""}`}>
      <div className="courses-section__header">
        <h2>Cursos y Certificaciones</h2>
        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiChevronDown />
        </button>
      </div>

      {isOpen && (
        <div className="courses-section__content">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="card-grid">
                <div className="field">
                  <label>Nombre del curso</label>
                  <input
                    type="text"
                    placeholder="Ej: React Avanzado"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Institución</label>
                  <input
                    type="text"
                    placeholder="Ej: Platzi"
                    value={course.institution}
                    onChange={(e) => updateCourse(course.id, "institution", e.target.value)}
                  />
                </div>

                <div className="field double">
                  <div>
                    <label>Fecha de inicio</label>
                    <input
                      type="month"
                      value={course.startDate}
                      onChange={(e) => updateCourse(course.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Fecha de finalización</label>
                    <input
                      type="month"
                      value={course.endDate}
                      onChange={(e) => updateCourse(course.id, "endDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="location-fields-vertical">
                <div className="field">
                    <label>País</label>
                    <input
                      type="text"
                      placeholder="Ej: Colombia"
                      value={course.country || ""}
                      onChange={(e) => updateCourse(course.id, "country", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Ciudad</label>
                    <input
                      type="text"
                      placeholder="Ej: Bogotá"
                      value={course.city || ""}
                      onChange={(e) => updateCourse(course.id, "city", e.target.value)}
                    />
                  </div>
                </div>

                {/* Botón de agregar o quitar enlace */}
                <div className="field full">
                  {course.showLink ? (
                    <div className="link-input-row">
                      <input
                        type="text"
                        placeholder="Ej: https://platzi.com/cursos/react"
                        value={course.link || ""}
                        onChange={(e) => updateCourse(course.id, "link", e.target.value)}
                      />
                      <button type="button" className="remove-link-btn" onClick={() => toggleLink(course.id)}>
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="add-link-btn"
                      onClick={() => toggleLink(course.id)}
                    >
                      <FiPlus /> Agregar enlace
                    </button>
                  )}
                </div>

                <div className="field full">
                  <label>Descripción</label>
                  <textarea
                    placeholder="Breve descripción del curso..."
                    value={course.description || ""}
                    onChange={(e) => updateCourse(course.id, "description", e.target.value)}
                  />
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeCourse(course.id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button className="add-btn" onClick={addCourse}>
            <FiPlus /> Agregar Curso
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
