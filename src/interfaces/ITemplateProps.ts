import type { IState } from "./IState";

export interface ITemplateProps {
   onlySection?: string; // ← NUEVO
   
  personalInfo: IState["personalInfo"];
  profileSection: string;
  educationSection: IState["educationEntries"];
  experienceSection: IState["experienceEntries"];
  skillSection: IState["skillsEntries"];
  languageSection: IState["languagesEntries"];
  linkSection: IState["linksEntries"];
  courseSection: IState["coursesEntries"];
  hobbieSection: IState["hobbiesEntries"];
  referenceSection: IState["referencesEntries"];
  awardSection: IState["awardsEntries"];
  customSection: IState["customEntries"];

  identitySection: IState["identity"];
  contactSection: IState["contactEntries"];

  sectionsConfig: IState["cvSections"]["sections"];
  sectionsOrder: IState["cvSections"]["order"];
}
