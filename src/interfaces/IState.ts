import type { IAwardEntry } from "./IAward";
import type { IContactEntry } from "./IContact";
import type { ICourseEntry } from "./ICourses";
import type { ICustomEntry } from "./ICustom";
import type { ICvSection, ICvSectionsState } from "./ICvSections";
import type { IEducationEntry } from "./IEducation";
import type { IExperienceEntry } from "./IExperience";
import type { IHobbyEntry } from "./IHobbies";
import type { IIdentityData } from "./IIdentity";
import type { ILanguageEntry } from "./ILanguages";
import type { ILinkEntry } from "./ILinks";
import type { IPersonalInfoEntry } from "./IPersonalInfo";
import type { IPhotoData } from "./IPhoto";
import type { IReferenceEntry } from "./IReferences";
import type { ISidebar } from "./ISidebar";
import type { ISkillEntry } from "./ISkills";

export interface IState{
    sidebar: ISidebar,
    personalInfo: IPersonalInfoEntry[],
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
    profileSection: String,
    cvSections: ICvSectionsState,
    photo: IPhotoData,
    identity: IIdentityData;
    contactEntries: IContactEntry[]
}