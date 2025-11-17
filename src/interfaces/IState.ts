import type { IAddSections } from "./IAddSections";
import type { IAwardEntry } from "./IAward";
import type { ICourseEntry } from "./ICourses";
import type { ICustomEntry } from "./ICustom";
import type { IEducationEntry } from "./IEducation";
import type { IExperienceEntry } from "./IExperience";
import type { IHobbyEntry } from "./IHobbies";
import type { ILanguageEntry } from "./ILanguages";
import type { ILinkEntry } from "./ILinks";
import type { IPersonalInfoData } from "./IPersonalInfo";
import type { IReferenceEntry } from "./IReferences";
import type { ISidebar } from "./ISidebar";
import type { ISkillEntry } from "./ISkills";

export interface IState{
    sidebar: ISidebar,
    personalInfo: IPersonalInfoData,
    educationEntries: IEducationEntry[],
    experienceEntries: IExperienceEntry[],
    skillsEntries: ISkillEntry[];
    languagesEntries: ILanguageEntry[];
    linksEntries: ILinkEntry[];
    coursesEntries: ICourseEntry[];
    hobbiesEntries: IHobbyEntry[];
    referencesEntries: IReferenceEntry[]
    awardsEntries: IAwardEntry[];
    customEntry: ICustomEntry;
    addSections: IAddSections,
    profileSection: String
}