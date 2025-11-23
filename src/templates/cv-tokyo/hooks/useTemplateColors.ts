// templates/CvTokyo/hooks/useTemplateColors.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cvTokyoDefaults } from "../constants";
import type { IState } from "../../../interfaces/IState";
import { loadTemplateDefaults, resetToTemplateDefaults } from "../../../reducers/colorFontSlice";

export const useTemplateColors = () => {
  const dispatch = useDispatch();

  const selected = useSelector((state: IState) => state.colorFont.selected);

  useEffect(() => {
  dispatch(loadTemplateDefaults(cvTokyoDefaults));

  return () => {
    dispatch(resetToTemplateDefaults());
  };
}, [dispatch]);

  return {
    photoBorder: selected.photoBorderColor || cvTokyoDefaults.photoBorderColor,
    title: selected.titleColor || cvTokyoDefaults.titleColor,
    profession: selected.professionColor || cvTokyoDefaults.professionColor,
    sectionTitle: selected.sectionTitleColor || cvTokyoDefaults.sectionTitleColor,
    text: selected.itemColor || cvTokyoDefaults.itemColor,
    qr: selected.qrColor || cvTokyoDefaults.qrColor,
    fontFamily: selected.font || cvTokyoDefaults.font,
  };
};