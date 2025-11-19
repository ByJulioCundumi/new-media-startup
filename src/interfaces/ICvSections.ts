export interface ICvSection {
  name: string;
  enabled: boolean;
  progress: number;
  isOpen: boolean;
}

// Estado del slice (sections + order)
export interface ICvSectionsState {
  sections: ICvSection[];
  order: string[]; // array de names en el orden visible
}
