// pages/OnlineCv.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./onlinecv.scss";

import { templates } from "../../templates/templates";
import type { IState } from "../../interfaces/IState";
import type { ICvSectionsState } from "../../interfaces/ICvSections";
import { setSidebar } from "../../reducers/sidebarSlice";
import { resetCvEditor } from "../../util/resetCvThunk";
import type { AppDispatch } from "../../app/store";

import { setPublicId, setSelectedCvId, setSelectedCvTitle, setSelectedTemplateId } from "../../reducers/cvCreationSlice";
import { setIdentity } from "../../reducers/identitySlice";
import { setContactEntries } from "../../reducers/contactSlice";
import { setProfileContent } from "../../reducers/profileSlice";
import { setEducationData } from "../../reducers/educationSlice";
import { setExperienceData } from "../../reducers/experienceSlice";
import { setSkillsEntries } from "../../reducers/skillsSlice";
import { setLanguagesEntries } from "../../reducers/languagesSlice";
import { setLinksEntries } from "../../reducers/linksSlice";
import { setCoursesEntries } from "../../reducers/coursesSlice";
import { setHobbiesEntries } from "../../reducers/hobbiesSlice";
import { setReferencesEntries } from "../../reducers/referencesSlice";
import { setAwardsEntries } from "../../reducers/awardsSlice";
import { setCustomEntries } from "../../reducers/customSlice";
import { setPersonalInfoEntries } from "../../reducers/personalInfoSlice";
import { setCvSections } from "../../reducers/cvSectionsSlice";
import { loadStoredValues, loadTemplateDefaults } from "../../reducers/colorFontSlice";

import { getPublicCvById } from "../../api/cv"; //
import { TbArrowBackUp, TbWorldWww } from "react-icons/tb";
import { IoDiamondOutline } from "react-icons/io5";

function OnlineCv() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { publicId } = useParams<{ publicId: string }>();
  const [cvUpdate, setCvUpdatae] = useState("")

  const { selectedTemplateId, selectedCvTitle } = useSelector((state: IState) => state.cvCreation);

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ----------------------------------------------------------------------------------
  // Carga del CV público por publicId
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    if (!publicId?.trim()) {
      navigate("/", { replace: true });
      return;
    }

    const loadPublicCv = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const cvData = await getPublicCvById(publicId);

        setCvUpdatae(cvData.updatedAt)
        // Dispatch de todos los datos al store
        dispatch(setPublicId(cvData.publicId));
        dispatch(setSelectedCvId(cvData.id));
        dispatch(setSelectedCvTitle(cvData.cvTitle));
        dispatch(setSelectedTemplateId(cvData.templateId));

        dispatch(setIdentity(cvData.identity || {}));
        dispatch(setContactEntries(cvData.contactEntries || []));
        dispatch(setProfileContent(cvData.profileContent || ""));
        dispatch(setEducationData(cvData.educationEntries || []));
        dispatch(setExperienceData(cvData.experienceEntries || []));
        dispatch(setSkillsEntries(cvData.skillsEntries || []));
        dispatch(setLanguagesEntries(cvData.languagesEntries || []));
        dispatch(setLinksEntries(cvData.linksEntries || []));
        dispatch(setCoursesEntries(cvData.coursesEntries || []));
        dispatch(setHobbiesEntries(cvData.hobbiesEntries || []));
        dispatch(setReferencesEntries(cvData.referencesEntries || []));
        dispatch(setAwardsEntries(cvData.awardsEntries || []));
        dispatch(setCustomEntries(cvData.customEntries || []));
        dispatch(setPersonalInfoEntries(cvData.personalInfoEntries || []));
        dispatch(setCvSections(cvData.cvSections || {}));

        // Color y fuente
        if (cvData.colorFont) {
          if (cvData.colorFont.defaults) dispatch(loadTemplateDefaults(cvData.colorFont.defaults));
          if (cvData.colorFont.selected) dispatch(loadStoredValues(cvData.colorFont.selected));
        }

        setIsLoading(false);
      } catch (err: any) {
        console.error("Error cargando CV público:", err);
        setNotFound(true);
        setTimeout(() => navigate("/", { replace: true }), 2000); // Redirige tras breve delay
      }
    };

    loadPublicCv();

    // Cleanup al desmontar
    return () => {
      dispatch(resetCvEditor());
    };
  }, [publicId, dispatch, navigate]);

  // ----------------------------------------------------------------------------------
  // Selectores para renderizado
  // ----------------------------------------------------------------------------------
  const cvSectionsState = useSelector((state: IState) => state.cvSections) as ICvSectionsState;
  const sections = cvSectionsState.sections;
  const order = cvSectionsState.order;

  const personalInfo = useSelector((state: IState) => state.personalInfo);
  const profile = useSelector((state: IState) => state.profileSection);
  const education = useSelector((state: IState) => state.educationEntries);
  const experience = useSelector((state: IState) => state.experienceEntries);
  const skills = useSelector((state: IState) => state.skillsEntries);
  const languages = useSelector((state: IState) => state.languagesEntries);
  const links = useSelector((state: IState) => state.linksEntries);
  const courses = useSelector((state: IState) => state.coursesEntries);
  const hobbies = useSelector((state: IState) => state.hobbiesEntries);
  const references = useSelector((state: IState) => state.referencesEntries);
  const awards = useSelector((state: IState) => state.awardsEntries);
  const customSection = useSelector((state: IState) => state.customEntries);
  const identity = useSelector((state: IState) => state.identity);
  const contact = useSelector((state: IState) => state.contactEntries);

  useEffect(() => {
    dispatch(setSidebar("cv")); // Sidebar minimalista para vista pública si lo deseas
  }, [dispatch]);

  const SelectedTemplate = templates.find((t) => t.id === selectedTemplateId)?.component;

  // Formatear fecha bonitamente
  const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ----------------------------------------------------------------------------------
  // Render: Loading, Not Found o CV
  // ----------------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="online-cv__loading-overlay">
        <div className="online-cv__loading-container">
          <h2 className="online-cv__loading-title">
            Buscando CV
          </h2>
          <div className="online-cv__loading-dots">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="online-cv__loading-overlay">
        <div className="online-cv__loading-container">
          <h2 className="online-cv__loading-title">CV no encontrado</h2>
          <p>El enlace es inválido o el CV ya no está disponible.</p>
          <p>Redirigiendo a tus CVs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="online-cv">
        <div className="online-cv__container">
          <div className="online-cv__head">
            <Link className="online-cv__back" to={"/"}><TbArrowBackUp /> Volver</Link>
            <div className="online-cv__head--data">
                <p>{formatDate(cvUpdate)}</p>
            </div>
        </div>
        </div>

      <div className="online-cv__content">
        <div className="online-cv__template">
        {SelectedTemplate && (
          <SelectedTemplate
            personalInfo={personalInfo}
            identitySection={identity}
            contactSection={contact}
            profileSection={profile}
            educationSection={education}
            experienceSection={experience}
            skillSection={skills}
            languageSection={languages}
            linkSection={links}
            courseSection={courses}
            hobbieSection={hobbies}
            referenceSection={references}
            awardSection={awards}
            customSection={customSection}
            sectionsConfig={sections}
            sectionsOrder={order}
          />
        )}
      </div>
      <p className="created-with"><TbWorldWww className="icon" /> Creado con <strong>cvremoto.com</strong></p>
      </div>
    </div>
  );
}

export default OnlineCv;