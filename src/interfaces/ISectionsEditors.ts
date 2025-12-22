export interface ICvSectionEditors {
  name: string;
  isOpen: boolean;
  isEditorOpen: boolean;
}

// Estado del slice (sections + order)
export interface ICvSectionsEditorState {
  sections: ICvSectionEditors[];
}
