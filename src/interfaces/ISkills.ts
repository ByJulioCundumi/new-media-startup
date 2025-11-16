// interfaces/ISkillEntry.ts
export interface ISkillEntry {
  id: string;
  name: string;
  level: "Principiante" | "Intermedio" | "Bueno" | "Alto" | "Experto";
}
