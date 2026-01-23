import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import type { IState } from "../interfaces/IState";

export const useTemplateColors = (defaults: any) => {
  const selected = useSelector((state: IState) => state.colorFont.selected);

  // 🔍 Detecta si selected está vacío comparando CADA propiedad
  const isSelectedEmpty =
    !selected ||
    Object.values({
      textColor: selected?.textColor,
      nameColor: selected?.nameColor,
      professionColor: selected?.professionColor,
      sectionTitleColor: selected?.sectionTitleColor,
      itemColor: selected?.itemColor,
      qrColor: selected?.qrColor,
      font: selected?.font,
    }).every((value) => value === undefined || value === null || value === "");

  useEffect(() => {
    if (isSelectedEmpty) {
      //dispatch(loadTemplateDefaults(defaults)); // causa error de colores por defecto
    }
  }, []); // solo en primer render

  // 🧪 Mezcla estable: si selected tiene un valor lo usa, si no usa default
  const colors = useMemo(() => {
    return {
      textColor: selected?.textColor || defaults.textColor,
      nameColor: selected?.nameColor || defaults.nameColor,
      professionColor: selected?.professionColor || defaults.professionColor,
      sectionTitleColor: selected?.sectionTitleColor || defaults.sectionTitleColor,
      itemColor: selected?.itemColor || defaults.itemColor,
      qrColor: selected?.qrColor || defaults.qrColor,
      fontFamily: selected?.font || defaults.font,
    };
  }, [selected, defaults]);

  return colors;
};
