// interfaces/IEducation.ts
export interface IEducationEntry {
  id: string;
  institution: string;
  location: string;
  title: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  present: boolean;
  description: string;
}
