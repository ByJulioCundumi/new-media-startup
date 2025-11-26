import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateSectionSize, removeSectionSize } from "../../reducers/sectionsMeasureSlice";

export const useMeasureSection = (sectionName: string, enabled: boolean) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Si la sección no está habilitada, eliminarla inmediatamente
    if (!enabled) {
      dispatch(removeSectionSize({ sectionName }));
      return;
    }

    if (!ref.current) return;

    const measure = () => {
      const el = ref.current!;
      const style = window.getComputedStyle(el);

      const height = el.offsetHeight;
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const totalHeight = height + marginTop + marginBottom;

      dispatch(
        updateSectionSize({
          sectionName,
          size: { height, paddingTop, paddingBottom, marginTop, marginBottom, totalHeight },
        })
      );
    };

    // Medición inicial
    measure();

    // Observador de cambios de tamaño
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);

    // Limpieza al desmontar: elimina la sección del estado aunque esté habilitada
    return () => {
      ro.disconnect();
      dispatch(removeSectionSize({ sectionName }));
    };
  }, [enabled, sectionName, dispatch]);

  return ref;
};
