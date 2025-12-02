// templates/util/useTemplateColors.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../interfaces/IState";
import { loadTemplateDefaults, resetToTemplateDefaults } from "../reducers/colorFontSlice";

export const useTemplateColors = (defaults: any) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: IState) => state.colorFont.selected);

  useEffect(() => {
    // Cargar defaults al montar plantilla
    dispatch(loadTemplateDefaults(defaults));

    // Reset al desmontar
    return () => {
      dispatch(resetToTemplateDefaults());
    };
  }, [dispatch, defaults]);

  return {
    textColor: selected.textColor || defaults.textColor,
    nameColor: selected.nameColor || defaults.nameColor,
    professionColor: selected.professionColor || defaults.professionColor,
    sectionTitleColor: selected.sectionTitleColor || defaults.sectionTitleColor,
    itemColor: selected.itemColor || defaults.itemColor,
    qrColor: selected.qrColor || defaults.qrColor,
    fontFamily: selected.font || defaults.font,
  };
};
