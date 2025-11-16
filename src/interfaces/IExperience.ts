// src/interfaces/IExperience.ts
export interface IExperienceEntry {
  id: string;
  position: string;
  employer: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  present: boolean;
  description: string;
}
