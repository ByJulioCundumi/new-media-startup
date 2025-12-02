export interface IColorFontState {
  isOpen: boolean;

  // 🎨 Valores seleccionados por el usuario (los actuales)
  selected: {
    textColor: string;
    nameColor: string;
    professionColor: string;
    sectionTitleColor: string;
    itemColor: string;
    qrColor: string;
    font: string;
  };

  // 🧩 Valores por defecto cargados según la plantilla  
  defaults: {
    textColor: string;
    nameColor: string;
    professionColor: string;
    sectionTitleColor: string;
    itemColor: string;
    qrColor: string;
    font: string;
  };
}
