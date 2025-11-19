import React, { useEffect, useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "./coursessection.scss";
import type { ICourseEntry } from "../../../interfaces/ICourses";
import type { IState } from "../../../interfaces/IState";
import {
  addCourseEntry,
  removeCourseEntry,
  setCoursesEntries,
  updateCourseEntry,
} from "../../../reducers/coursesSlice";
import { PiGraduationCapLight } from "react-icons/pi";
import { setOnlySectionOpen, setSectionProgress, toggleSectionOpen, updateSectionTitle } from "../../../reducers/cvSectionsSlice";

interface CoursesSectionProps {
  initialData?: ICourseEntry[];
  onChange?: (data: ICourseEntry[]) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ initialData, onChange }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state: IState) => state.coursesEntries);

  const sectionState = useSelector((state: IState) =>
    state.cvSections.sections.find((s) => s.name === "courseSection")
  );

  const isOpen = sectionState?.isOpen ?? false;

  // Sync external data
  useEffect(() => {
    if (initialData) {
      dispatch(setCoursesEntries(initialData));
    }
  }, [initialData, dispatch]);

  // Callback notify
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
      })
    );
  };

  const updateCourse = (id: string, field: keyof ICourseEntry, value: any) => {
    dispatch(updateCourseEntry({ id, field, value }));
  };

  const removeCourse = (id: string) => {
    dispatch(removeCourseEntry(id));
  };

  /** PROGRESS SYSTEM **/
  const progress = useMemo(() => {
    if (!courses.length) return 0;

    let totalFields = 0;
    let completedFields = 0;

    courses.forEach((course) => {
      const mandatory = [
        course.name,
        course.institution,
        course.startDate,
      ];

      mandatory.forEach((field) => {
        totalFields++;
        if (field?.toString().trim()) completedFields++;
      });

      const optional = [
        course.endDate,
        course.country,
        course.city,
        course.description,
      ];

      optional.forEach((field) => {
        totalFields++;
        if (field?.toString().trim()) completedFields++;
      });
    });

    return Math.round((completedFields / totalFields) * 100);
  }, [courses]);

  // Guardar progreso en tiempo real
useEffect(() => {
  dispatch(setSectionProgress({ name: "courseSection", progress }));
}, [progress, dispatch]);

const progressColorClass = useMemo(() => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue"; // 100%
}, [progress]);

  // -----------------------------
  // 🔵 STATE PARA EDICIÓN DEL TÍTULO
  // -----------------------------
  const [editingTitle, setEditingTitle] = useState(false);
  const title = sectionState?.title ?? "Cursos y Certificados";

  return (
    <div className={`courses-section ${!isOpen ? "closed" : ""}`}>
      <div className="courses-section__header">
        {/* TÍTULO EDITABLE */}
        <div className="editable-title">
          {!editingTitle ? (
            <h2
              className="title-display"
              onClick={() => setEditingTitle(true)}
            >
              <PiGraduationCapLight /> {title}
            </h2>
          ) : (
            <input
              className="title-input"
              autoFocus
              value={title}
              onChange={(e) =>
                dispatch(updateSectionTitle({ name: "courseSection", title: e.target.value }))
              }
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
            />
          )}
        </div>

        <div className={`progress-indicator ${progressColorClass}`}>{progress}%</div>

        <button
          className={`toggle-btn ${isOpen ? "open" : ""}`}
          onClick={() => dispatch(toggleSectionOpen("courseSection"))}
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
