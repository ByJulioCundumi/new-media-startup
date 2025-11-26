export interface ISizeProps {
  width: number;
  height: number;
  top: number;
  left: number;
  paddingTop: number;
  paddingBottom: number;
  marginTop: number;
  marginBottom: number;
  totalHeight: number; // height + marginTop + marginBottom
}

export interface ISectionSize {
  height: number;
  paddingTop: number;
  paddingBottom: number;
  marginTop: number;
  marginBottom: number;
  totalHeight: number; // height + marginTop + marginBottom
}

export interface ILayoutMeasureState {
  page: ISizeProps | null;
  split: ISizeProps | null;
  vertical: ISizeProps | null;
  horizontal: ISizeProps | null;
  sections: Record<string, ISectionSize>;
}