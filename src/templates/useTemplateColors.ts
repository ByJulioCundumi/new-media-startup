import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { IState } from "../interfaces/IState";

export const useTemplateColors = (templateDefaults: any) => {
  const selected = useSelector((state: IState) => state.colorFont.selected);

  return useMemo(() => ({
    textColor:        selected?.textColor        || templateDefaults?.textColor        ,
    nameColor:        selected?.nameColor        || templateDefaults?.nameColor        ,
    professionColor:  selected?.professionColor  || templateDefaults?.professionColor  ,
    sectionTitleColor:selected?.sectionTitleColor|| templateDefaults?.sectionTitleColor,
    itemColor:        selected?.itemColor        || templateDefaults?.itemColor        ,
    qrColor:          selected?.qrColor          || templateDefaults?.qrColor          ,
    font:       selected?.font             || templateDefaults?.font             ,
  }), [selected, templateDefaults]);
};