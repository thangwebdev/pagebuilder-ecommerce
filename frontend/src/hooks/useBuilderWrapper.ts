import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SxProps } from "@mui/material";
import { MouseEvent, useEffect, useMemo } from "react";
import { useBuilderContext } from "~/contexts/BuilderProvider";

const POSITION_STYLES: {
  afterItemRow: SxProps;
  beforeItemRow: SxProps;
  afterItemColumn: SxProps;
  beforeItemColumn: SxProps;
  innerContainerColumn: SxProps;
  innerContainerRow: SxProps;
} = {
  afterItemRow: {
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: "-4px",
      height: "100%",
      width: "4px",
      backgroundColor: "primary.main",
    },
  },
  beforeItemRow: {
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: "-4px",
      height: "100%",
      width: "4px",
      backgroundColor: "primary.main",
    },
  },
  afterItemColumn: {
    "&:before": {
      content: "''",
      position: "absolute",
      bottom: "-4px",
      left: 0,
      height: "4px",
      width: "100%",
      backgroundColor: "primary.main",
    },
  },
  beforeItemColumn: {
    "&:before": {
      content: "''",
      position: "absolute",
      top: "-4px",
      left: 0,
      height: "4px",
      width: "100%",
      backgroundColor: "primary.main",
    },
  },
  innerContainerColumn: {
    "&:before": {
      content: "''",
      position: "absolute",
      top: "2px",
      left: 0,
      height: "4px",
      width: "100%",
      backgroundColor: "primary.main",
    },
  },
  innerContainerRow: {
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: "2px",
      height: "100%",
      width: "4px",
      backgroundColor: "primary.main",
    },
  },
};

const useBuilderWrapper = ({
  path,
  sx,
  isContainer = true,
}: {
  path: string;
  sx: SxProps;
  isContainer?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    isOver,
    active,
    over,
    overIndex,
    activeIndex,
  } = useSortable({
    id: path,
    data: {
      isContainer,
      sx: {
        padding: "10px",
        cursor: "pointer",
        border: "1px dashed",
        borderColor: "grey.100",
        borderCollapse: "collapse",
        ...sx,
      } as SxProps,
    },
  });
  const {
    value: { actions, load, storePageData, indexPageData },
    handleUpdateValues,
    findParentByPath,
    findElementByPath,
  } = useBuilderContext();

  const handleSelect = (event: MouseEvent) => {
    event.stopPropagation();

    handleUpdateValues({
      builderActivePath: path,
      pathWillAdd: path,
      actions: {
        ...actions,
        add: !!isContainer,
      },
    });
  };

  const style = {
    transition,
    transform: isSorting ? undefined : CSS.Translate.toString(transform),
  };

  const overStyle: SxProps = useMemo(() => {
    if (!over || !active) return {};
    if (over.id === active.id) return {};

    if (isOver) {
      const parentActive = findParentByPath(
        storePageData[indexPageData].elements,
        active.id as string
      );

      const parentOver = findParentByPath(
        storePageData[indexPageData].elements,
        over.id as string
      );

      const overElement = findElementByPath(
        storePageData[indexPageData].elements,
        over.id as string
      );

      if (!parentOver || !parentActive) return {};

      // Nếu active đang over vào cha của nó thì bỏ qua
      if (parentActive !== "builder" && parentActive?.path === over.id) {
        return {};
      }
      //Nếu cha over vào con nó thì bỏ qua
      if (parentOver !== "builder" && parentOver.path === active.id) {
        return {};
      }
      // Phân loại style cho position
      let direction: "row" | "column";
      let isAfter: boolean;
      // TH 1: Nếu cha của active và over cùng là builder
      if (parentOver === "builder" && parentActive === "builder") {
        isAfter = activeIndex < overIndex;
        return isAfter
          ? POSITION_STYLES.afterItemColumn
          : POSITION_STYLES.beforeItemColumn;
        // TH 2: Nếu cha của active và builder đều khác builder
      } else if (parentOver !== "builder" && parentActive !== "builder") {
        direction = parentOver.propData.direction || "column";
        // TH 2.1: nếu cha của active và over giống nhau
        if (parentOver.path === parentActive.path) {
          isAfter = activeIndex < overIndex;
          if (direction === "row") {
            return isAfter
              ? POSITION_STYLES.afterItemRow
              : POSITION_STYLES.beforeItemRow;
          } else {
            return isAfter
              ? POSITION_STYLES.afterItemColumn
              : POSITION_STYLES.beforeItemColumn;
          }
          // TH 2.2 Nếu cha của active và over khác nhau
        } else {
          if (overElement.propData.isContainer) {
            direction = overElement.propData.direction || "column";
            if (direction === "row") {
              return POSITION_STYLES.innerContainerRow;
            } else {
              return POSITION_STYLES.innerContainerColumn;
            }
          } else {
            if (direction === "row") {
              return POSITION_STYLES.afterItemRow;
            } else {
              return POSITION_STYLES.afterItemColumn;
            }
          }
        }
        // TH 3: nếu cha của active là builder và cha của over không phải builder
      } else if (parentActive === "builder" && parentOver !== "builder") {
        if (overElement.propData.isContainer) {
          direction = overElement.propData.direction || "column";
          if (direction === "row") {
            return POSITION_STYLES.innerContainerRow;
          } else {
            return POSITION_STYLES.innerContainerColumn;
          }
        } else {
          direction = parentOver.propData.direction || "column";
          if (direction === "row") {
            return POSITION_STYLES.afterItemRow;
          } else {
            return POSITION_STYLES.afterItemColumn;
          }
        }
        // TH 4: Nếu cha của active không phải builder và cha của over là builder
      } else {
        direction = overElement.propData.direction || "column";
        if (overElement.propData.isContainer) {
          if (direction === "row") {
            return POSITION_STYLES.innerContainerRow;
          } else {
            return POSITION_STYLES.innerContainerColumn;
          }
        } else {
          return POSITION_STYLES.afterItemColumn;
        }
      }
    } else {
      return {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);

  useEffect(() => {
    handleUpdateValues({ load: load + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    id: path,
    ref: setNodeRef,
    style: style,
    ...attributes,
    ...listeners,
    onClick: handleSelect,
    sx: {
      padding: "10px",
      cursor: "pointer",
      border: "1px dashed",
      borderColor: isDragging ? "primary.main" : "grey.200",
      position: "relative",
      ...overStyle,
      ...sx,
    } as SxProps,
  };
};

export default useBuilderWrapper;
