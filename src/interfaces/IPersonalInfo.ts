// src/interfaces/IPersonalInfo.ts
export interface IPersonalInfoData {
  photo: string;
  firstName: string;
  lastName: string;
  desiredJob: string;
  email: string;
  phone: string;
  city: string;

  /** Campos opcionales */
  address?: string;
  postalCode?: string;
  birthDate?: string;
  nationality?: string;
  civilStatus?: string;
  website?: string;
  linkedin?: string;

  /** Campo personalizado */
  custom?: string;          // 👈 NECESARIO para usar key="custom"
  customLabel?: string;
  customValue?: string;

  /** Lista de campos opcionales activos */
  activeFields: (keyof IPersonalInfoData)[];
}
