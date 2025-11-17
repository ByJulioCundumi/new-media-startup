import type { IAwardEntry } from "../interfaces/IAward";
import type { ICourseEntry } from "../interfaces/ICourses";
import type { ICustomEntry } from "../interfaces/ICustom";
import type { IEducationEntry } from "../interfaces/IEducation";
import type { IExperienceEntry } from "../interfaces/IExperience";
import type { IHobbyEntry } from "../interfaces/IHobbies";
import type { ILanguageEntry } from "../interfaces/ILanguages";
import type { ILinkEntry } from "../interfaces/ILinks";
import type { IPersonalInfoData } from "../interfaces/IPersonalInfo";
import type { IReferenceEntry } from "../interfaces/IReferences";
import type { ISkillEntry } from "../interfaces/ISkills";

// PERSONAL INFO
export const personalInfoMock: IPersonalInfoData = {
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
  firstName: "Julio",
  lastName: "Cundumi",
  desiredJob: "Desarrollador Frontend",
  email: "julio.cundumi@example.com",
  phone: "+57 312 345 6789",
  city: "Bogotá",
  address: "Cra 45 #12-34",
  postalCode: "110111",
  birthDate: "1990-05-10",
  nationality: "Colombiana",
  civilStatus: "Soltero",
  website: "https://julio.dev",
  linkedin: "https://linkedin.com/in/juliocundumi",
  disablePhoto: false,
  activeFields: ["address", "postalCode", "birthDate", "nationality"],
};

// PROFILE
export const profileMock = `Desarrollador frontend con más de 5 años de experiencia en React, TypeScript y Redux. Apasionado por la creación de interfaces modernas y accesibles.`;

// EDUCATION
export const educationMock: IEducationEntry[] = [
  {
    id: "edu1",
    institution: "Universidad Nacional de Colombia",
    location: "Bogotá, Colombia",
    title: "Ingeniería de Sistemas",
    startMonth: "01",
    startYear: "2010",
    endMonth: "12",
    endYear: "2014",
    present: false,
    description: "Promedio destacado y participación en proyectos de software libres.",
  },
];

// EXPERIENCE
export const experienceMock: IExperienceEntry[] = [
  {
    id: "exp1",
    position: "Desarrollador Frontend Senior",
    employer: "Tech Solutions S.A.",
    location: "Bogotá, Colombia",
    startMonth: "01",
    startYear: "2020",
    endMonth: undefined,
    endYear: undefined,
    present: true,
    description: "Desarrollo de aplicaciones web usando React, Redux y TailwindCSS.",
  },
  {
    id: "exp2",
    position: "Desarrollador Frontend",
    employer: "Innovatech",
    location: "Bogotá, Colombia",
    startMonth: "03",
    startYear: "2016",
    endMonth: "12",
    endYear: "2019",
    present: false,
    description: "Participación en proyectos de e-commerce y dashboards internos.",
  },
];

// SKILLS
export const skillsMock: ISkillEntry[] = [
  { id: "s1", name: "React", level: "Experto" },
  { id: "s2", name: "TypeScript", level: "Alto" },
  { id: "s3", name: "Redux", level: "Alto" },
  { id: "s4", name: "HTML/CSS", level: "Experto" },
];

// LANGUAGES
export const languagesMock: ILanguageEntry[] = [
  { id: "l1", name: "Español", level: "Nativo" },
  { id: "l2", name: "Inglés", level: "C1" },
];

// LINKS
export const linksMock: ILinkEntry[] = [
  { id: "link1", name: "GitHub", url: "https://github.com/juliocundumi" },
  { id: "link2", name: "Portfolio", url: "https://julio.dev" },
];

// COURSES
export const coursesMock: ICourseEntry[] = [
  {
    id: "course1",
    name: "React Avanzado",
    institution: "Platzi",
    startDate: "2021-01",
    endDate: "2021-03",
    city: "Online",
    country: "Colombia",
    link: "https://platzi.com/cursos/react-avanzado",
    showLink: true,
    description: "Curso avanzado de React con hooks, context y performance.",
  },
];

// HOBBIES
export const hobbiesMock: IHobbyEntry[] = [
  { id: "h1", name: "Ciclismo" },
  { id: "h2", name: "Fotografía" },
  { id: "h3", name: "Lectura" },
];

// REFERENCES
export const referencesMock: IReferenceEntry[] = [
  { id: "ref1", name: "Ana Pérez", company: "Tech Solutions", phone: "+57 300 111 2233", email: "ana.perez@tech.com" },
];

// AWARDS
export const awardsMock: IAwardEntry[] = [
  { id: "award1", name: "Empleado del Año", date: "2022-12", description: "Reconocimiento al mejor desempeño en proyectos frontend.", showLink: false },
];

// CUSTOM SECTION
export const customSectionMock: ICustomEntry = {
  title: "Proyectos Personales",
  items: [
    { id: "c1", content: "App de tareas en React + TypeScript" },
    { id: "c2", content: "Portfolio personal con Next.js" },
  ],
};
