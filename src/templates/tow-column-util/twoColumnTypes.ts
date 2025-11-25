export interface SectionInput {
  name: string;
  orientation: "both" | "horizontal";
  render: React.ReactNode;
}

export interface SectionMeasured {
  name: string;
  orientation: "both" | "horizontal";
  height: number;
  element: React.ReactNode;
}

export interface PageColumns {
  left: SectionMeasured[];
  right: SectionMeasured[];
}
