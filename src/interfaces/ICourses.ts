export interface ICourseEntry {
  id: string;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  city?: string;
  country?: string;
  link?: string;
  description?: string;
  showLink?: boolean;
}
