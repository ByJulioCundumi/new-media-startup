export interface ICvSection {
  name: string;
  enabled: boolean;
  progress: number;
  title: string;
  orientation: "vertical" | "horizontal" | "header";
}

// Estado del slice (sections + order)
export interface ICvSectionsState {
  sections: ICvSection[];
  order: string[]; // array de names en el orden visible
}
