import "./jobOffer.scss";
import {
  FaBriefcase,
  FaUsers,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { getAllCvsApi } from "../../api/cv";
import { templates } from "../../templates/templates";
import { BsFillCloudCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AffiliateCommissionRequest from "../../pages/account-page/affiliate-commission-requeset/AffiliateCommissionRequest";

const JobOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onlineCvs, setOnlineCvs] = useState<any[]>([]);
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [showCommissionForm, setShowCommissionForm] = useState(false); // Nuevo estado
  const [selectedCv, setSelectedCv] = useState<any | null>(null); // Opcional: guardar el CV enviado

  const isLogged = useSelector((state: IState) => state.user.logged);

  const openModal = async () => {
    setIsModalOpen(true);
    setShowCommissionForm(false); // Reiniciar al abrir
    setSelectedCv(null);

    if (!isLogged) return;

    setLoadingCvs(true);
    try {
      const backendCvs = await getAllCvsApi();
      const trulyOnline = backendCvs.filter((cv: any) => cv.id && !cv.localId);
      setOnlineCvs(trulyOnline);
    } catch (err) {
      console.warn("Error cargando CVs online:", err);
      setOnlineCvs([]);
    } finally {
      setLoadingCvs(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowCommissionForm(false);
  };

  const handleSendCv = (cv: any) => {
    setSelectedCv(cv);
    setShowCommissionForm(true);
    // Aquí puedes llamar a una API real para registrar la postulación si lo necesitas
    // await applyToAffiliateJob(cv.id);
  };

  return (
    <>
      <section className="job-offer-card-container">
        <article className="job-offer-card">
          <div className="job-content">
            <header className="company-header">
              <div className="company-logo">
                <FaBriefcase />
              </div>
              <div className="company-info">
                <h3 className="company-name">Promotor - Sin Experiencia</h3>
                <p className="company-tagline">www.cvremoto.com</p>
              </div>
            </header>

            <p className="job-offer__info">
              Trabaja desde casa sin horarios promocionando nuestro creador de CVs. Postula enviandonos tu cv creado en nuestra
              plataforma y comienza a ganar comisiones recurrentes de hasta el 70%.
            </p>

            <div className="job-stats">
              <span>
                <FaUsers />
                <strong>1.248</strong> Postulados Aceptados
              </span>
            </div>
          </div>

          <aside className="job-action">
            <button className="apply-button" onClick={openModal}>
              Envia tu CV <FaArrowRight />
            </button>
            <p className="action-note">
              *Solo CVs creados en cvremoto.com / Sin Marca De Agua
            </p>
          </aside>
        </article>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content job-offer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>

            {/* Título dinámico según el estado */}
            <div>
              <h2>
                {showCommissionForm
                  ? "¡Completa tu postulación!"
                  : "¡Selecciona tu CV para postularte!"}
              </h2>
              <p className="modal-subtitle">
                {showCommissionForm
                  ? "Envia tu solicitud de afiliacion desde hotmart y envianos los datos de la cuenta solicitante, nombre y email (en hotmart)."
                  : "CVs guardados (sin marca de agua)"}
              </p>
            </div>

            {/* Contenido principal del modal */}
            {showCommissionForm ? (
              // Aquí se muestra el formulario de comisión
              <div className="commission-form-container">
                <AffiliateCommissionRequest />
              </div>
            ) : (
              <>
                {/* Estados iniciales: login, loading, sin CVs o lista */}
                {!isLogged ? (
                  <div className="modal-message-center">
                    <p>Debes iniciar sesión para ver y enviar tus CVs.</p>
                    <a href="/login" className="modal-btn primary">
                      Iniciar sesión
                    </a>
                  </div>
                ) : loadingCvs ? (
                  <p className="loading-text modal-message-center">
                    Cargando tus CVs guardados en la nube...
                  </p>
                ) : onlineCvs.length === 0 ? (
                  <div className="modal-message-center no-cvs">
                    <p>Aún no tienes CVs guardados sin marca de agua.</p>
                    <Link
                      to={"/cvs"}
                      className="modal-btn primary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Crear mi CV ahora
                    </Link>
                  </div>
                ) : (
                  <div className="cvs-grid">
                    {onlineCvs.map((cv) => {
                      const tpl = templates.find((t) => t.id === cv.templateId) || templates[0];
                      const Component = tpl.component;

                      const sections = cv.cvSections?.sections || [];
                      const enabledSections = sections.filter((s: any) => s.enabled);
                      const totalProgress = enabledSections.length > 0
                        ? Math.round(
                            enabledSections.reduce((sum: number, s: any) => sum + s.progress, 0) /
                              enabledSections.length
                          )
                        : 0;

                      const progressColor =
                        totalProgress < 30
                          ? "#ef4444ad"
                          : totalProgress < 70
                          ? "#f59f0b88"
                          : "#0bc2f5";

                      return (
                        <div key={cv.id} className="cv-item preview-only">
                          <div className="not-draft-tag">
                            <BsFillCloudCheckFill />
                          </div>

                          <div className="cv-progress-tag" style={{ backgroundColor: progressColor }}>
                            <span className="progress-text">{totalProgress}%</span>
                          </div>

                          <div className="cv-preview">
                            <div className="cv-preview-scale">
                              <Component
                                personalInfo={cv.personalInfoEntries || []}
                                identitySection={cv.identity || {}}
                                contactSection={cv.contactEntries || []}
                                profileSection={cv.profileContent || ""}
                                educationSection={cv.educationEntries || []}
                                experienceSection={cv.experienceEntries || []}
                                skillSection={cv.skillsEntries || []}
                                languageSection={cv.languagesEntries || []}
                                linkSection={cv.linksEntries || []}
                                courseSection={cv.coursesEntries || []}
                                hobbieSection={cv.hobbiesEntries || []}
                                referenceSection={cv.referencesEntries || []}
                                awardSection={cv.awardsEntries || []}
                                customSection={cv.customEntries || []}
                                sectionsConfig={cv.cvSections?.sections || []}
                                sectionsOrder={cv.cvSections?.order || []}
                              />
                            </div>
                          </div>

                          <div className="cv-info">
                            <h3>{cv.cvTitle}</h3>
                            <p>
                              {tpl.label} - {new Date(cv.updatedAt || cv.createdAt).toLocaleDateString("es-ES")}
                            </p>
                          </div>

                          <button
                            className="select-cv-btn"
                            onClick={() => handleSendCv(cv)}
                          >
                            Enviar CV
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Footer opcional */}
            {!showCommissionForm && (
              <p className="modal-footer">
                ¡Trabaja Con Nosotros! Ya hay más de 1.248 personas aceptadas.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobOffer;