import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./coursessection.scss";
import type { ICourseEntry } from "../../../interfaces/ICourses";
import type { IState } from "../../../interfaces/IState";
import { addCourseEntry, removeCourseEntry, setCoursesEntries, updateCourseEntry } from "../../../reducers/coursesSlice";
import { FaGraduationCap } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { PiGraduationCapLight } from "react-icons/pi";

interface CoursesSectionProps {
  initialData?: ICourseEntry[];
  onChange?: (data: ICourseEntry[]) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ initialData, onChange }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state: IState) => state.coursesEntries);

  const [isOpen, setIsOpen] = useState(true);

  // Sincronizar initialData si viene desde arriba
  useEffect(() => {
    if (initialData) {
      dispatch(setCoursesEntries(initialData));
    }
  }, [initialData, dispatch]);

  // Notificar cambios al padre
  useEffect(() => {
    onChange?.(courses);
  }, [courses, onChange]);

  const addCourse = () => {
    dispatch(
      addCourseEntry({
        id: crypto.randomUUID(),
        name: "",
        institution: "",
        startDate: "",
        endDate: "",
        city: "",
        country: "",
        description: "",
        link: "",
        showLink: false,
      })
    );
  };

  const updateCourse = (id: string, field: keyof ICourseEntry, value: any) => {
    dispatch(updateCourseEntry({ id, field, value }));
  };

  const removeCourse = (id: string) => {
    dispatch(removeCourseEntry(id));
  };

  const toggleLink = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;

    const newShowLink = !course.showLink;

    dispatch(updateCourseEntry({ id, field: "showLink", value: newShowLink }));

    if (!newShowLink) {
      dispatch(updateCourseEntry({ id, field: "link", value: "" }));
    }
  };

  return (
    <div className={`courses-section ${!isOpen ? "closed" : ""}`}>
      <div className="courses-section__header">
        <h2><PiGraduationCapLight /> Cursos y Certificaciones</h2>
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

                {/* Link */}
                <div className="field full">
                  {course.showLink ? (
                    <div className="courses-link-input-row">
                      <input
                        type="text"
                        placeholder="Ej: https://platzi.com/cursos/react"
                        value={course.link || ""}
                        onChange={(e) => updateCourse(course.id, "link", e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-link-btn"
                        onClick={() => toggleLink(course.id)}
                      >
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
                    onChange={(e) =>
                      updateCourse(course.id, "description", e.target.value)
                    }
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
