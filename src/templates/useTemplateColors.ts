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
    photoBorder: selected.photoBorderColor || defaults.photoBorderColor,
    title: selected.titleColor || defaults.titleColor,
    profession: selected.professionColor || defaults.professionColor,
    sectionTitle: selected.sectionTitleColor || defaults.sectionTitleColor,
    text: selected.itemColor || defaults.itemColor,
    qr: selected.qrColor || defaults.qrColor,
    fontFamily: selected.font || defaults.font,
  };
};
