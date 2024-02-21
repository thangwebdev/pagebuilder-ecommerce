import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ISortableProps {
  id: string;
  data?: any;
  children?: React.ReactNode;
}

function Sortable({ id, data, children }: ISortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default Sortable;
