export interface IColorFontState {
  isOpen: boolean;

  // 🎨 Valores seleccionados por el usuario (los actuales)
  selected: {
    photoBorderColor: string;
    titleColor: string;
    professionColor: string;
    sectionTitleColor: string;
    itemColor: string;
    qrColor: string;
    font: string;
  };

  // 🧩 Valores por defecto cargados según la plantilla  
  defaults: {
    photoBorderColor: string;
    titleColor: string;
    professionColor: string;
    sectionTitleColor: string;
    itemColor: string;
    qrColor: string;
    font: string;
  };
}
