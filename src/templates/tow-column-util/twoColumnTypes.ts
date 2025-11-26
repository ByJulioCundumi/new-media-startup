export interface SectionInput {
  name: string;
  orientation: "vertical" | "horizontal";
  render: React.ReactNode;
}

export interface SectionMeasured {
  name: string;
  orientation: "vertical" | "horizontal";
  height: number;
  element: React.ReactNode;
}

export interface PageColumns {
  left: SectionMeasured[];
  right: SectionMeasured[];
}
