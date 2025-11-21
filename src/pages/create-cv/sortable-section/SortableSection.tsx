// components/sortable/SortableSection.tsx
import React from "react";
import {
  useSortable,
  defaultAnimateLayoutChanges,
  type UseSortableArguments,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsGripVertical } from "react-icons/bs";
import { RiDraggable } from "react-icons/ri";
import { LuGrab } from "react-icons/lu";
import "./sortablesection.scss"
import { toggleSectionEditor } from "../../../reducers/cvSectionsSlice";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SortableSection envuelve cada sección para que sea arrastrable.
 * Si id === "identitySection" el item se marca como disabled (no arrastrable).
 */
const SortableSection: React.FC<Props> = ({ id, children, className = "" }) => {
  const disabled = id === "identitySection";
  const dispatch = useDispatch()
  const params: UseSortableArguments = {
    id,
    animateLayoutChanges: (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
    disabled,
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable(params);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : undefined,
    touchAction: "manipulation",
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style} className={`sortable-section ${className}`}>
      <div className="sortable-inner">
        {/* handle: if not disabled, pass listeners to a handle icon/button. If you prefer whole card draggable,
            you can spread listeners on the container instead. */}
        {!disabled ? (
          <div className="drag-handle" {...listeners}>
            <RiDraggable size={20} />
            </div>
        ) : (
          <div className="drag-handle disabled"> </div>
        )}

        <div className="sortable-content"
          onClick={() => {
            dispatch(toggleSectionEditor(id));
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SortableSection;
