export interface ICvSaveState {
  originalData: any | null;  // todo el objeto del CV tal como vino del backend
  hasUnsavedChanges: boolean;
  isSaving: boolean;
}