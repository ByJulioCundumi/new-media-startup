import type { IAwardEntry } from "./IAward";
import type { ICategories } from "./ICategory";
import type { IColorFontState } from "./IColorFont";
import type { IContactEntry } from "./IContact";
import type { ICourseEntry } from "./ICourses";
import type { ICustomEntry } from "./ICustom";
import type { ICvSectionsState } from "./ICvSections";
import type { IEducationEntry } from "./IEducation";
import type { IExperienceEntry } from "./IExperience";
import type { IHobbyEntry } from "./IHobbies";
import type { IIdentityData } from "./IIdentity";
import type { ILanguageEntry } from "./ILanguages";
import type { ILinkEntry } from "./ILinks";
import type { IPersonalInfoEntry } from "./IPersonalInfo";
import type { IReferenceEntry } from "./IReferences";
import type { ISidebar } from "./ISidebar";
import type { ISkillEntry } from "./ISkills";
import type { IToolbarOption } from "./IToolbarOption";

export interface IState{
    sidebar: ISidebar,
    personalInfo: IPersonalInfoEntry[], // cv sections
    educationEntries: IEducationEntry[], // cv sections
    experienceEntries: IExperienceEntry[], // cv sections
    skillsEntries: ISkillEntry[]; // cv sections
    languagesEntries: ILanguageEntry[]; // cv sections
    linksEntries: ILinkEntry[]; // cv sections
    coursesEntries: ICourseEntry[]; // cv sections
    hobbiesEntries: IHobbyEntry[]; // cv sections
    referencesEntries: IReferenceEntry[] // cv sections
    awardsEntries: IAwardEntry[]; // cv sections
    customEntries: ICustomEntry[] // cv sections
    profileSection: string, // cv sections
    cvSections: ICvSectionsState,
    identity: IIdentityData; // cv sections
    contactEntries: IContactEntry[], // cv sections
    colorFont: IColorFontState,
    toolbarOption: IToolbarOption,
    template: {id: string},
    categories: ICategories,
}