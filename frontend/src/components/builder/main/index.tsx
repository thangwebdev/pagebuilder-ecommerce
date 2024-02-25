import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import PlusComponent from "../plus-component";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdAddCircleOutline, MdArrowUpward } from "react-icons/md";
import { CgTrashEmpty } from "react-icons/cg";
import GenerateElements from "./GenerateElements";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { cloneDeep } from "lodash";
import { SPLIT_SYMBOL } from "~/utils/constants";

interface IMainProps {}

const OPTION_HEIGHT = 40;
const OPTION_WIDTH = 172;

function Main({}: IMainProps) {
  const {
    value: { storePageData, indexPageData, builderActivePath, actions, load },
    handleUpdateValues,
    handleDeleteElement,
    handleDuplicateElement,
    findParentByPath,
    findElementByPath,
    handleUndo,
    handleRedo,
    updatePath,
  } = useBuilderContext();
  const builderRef = useRef<HTMLDivElement>(null);

  const [toolStyle, setToolStyle] = useState({ wrapper: {}, option: {} });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // handle drag start
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (!active) return;

    handleUpdateValues({
      builderActivePath: "",
    });
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    // Khởi tạo dữ liệu cần thiết
    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    const parentOfActive = findParentByPath(
      pageDataClone.elements,
      active.id as string
    );
    const parentOfOver = findParentByPath(
      pageDataClone.elements,
      over.id as string
    );
    const overElement = findElementByPath(
      pageDataClone.elements,
      over.id as string
    );

    let activeIndex: number = -1;
    let overIndex: number = -1;

    if (!parentOfActive || !parentOfOver || !overElement) return;
    // nếu active đang over vào cha nó thì bỏ qua
    if (parentOfOver !== "builder" && parentOfOver.path === over.id) return;
    //Nếu cha over vào con nó thì bỏ qua
    if (parentOfOver !== "builder" && parentOfOver.path === active.id) return;

    // xác định các trường hợp

    // TH 1: Nếu cha của active và over cùng là builder
    if (parentOfActive === "builder" && parentOfOver === "builder") {
      activeIndex = pageDataClone.elements.findIndex(
        (item) => item.path === active.id
      );
      overIndex = pageDataClone.elements.findIndex(
        (item) => item.path === over.id
      );
      const temp = pageDataClone.elements[activeIndex];
      pageDataClone.elements.splice(activeIndex, 1);
      pageDataClone.elements.splice(overIndex, 0, temp);
      // TH 2: Nếu cha của active và builder đều khác builder
    } else if (parentOfActive !== "builder" && parentOfOver !== "builder") {
      // TH 2.1: nếu cha của active và over giống nhau
      if (parentOfActive.path === parentOfOver.path) {
        if (!parentOfActive.propData.components) return;
        activeIndex = parentOfActive.propData.components.findIndex(
          (item) => item.path === active.id
        );
        overIndex = parentOfActive.propData.components.findIndex(
          (item) => item.path === over.id
        );
        const temp = parentOfActive.propData.components[activeIndex];
        parentOfActive.propData.components.splice(activeIndex, 1);
        parentOfActive.propData.components.splice(overIndex, 0, temp);
        // TH 2.2 Nếu cha của active và over khác nhau
      } else {
        if (!parentOfActive.propData.components) return;
        activeIndex = parentOfActive.propData.components.findIndex(
          (item) => item.path === active.id
        );
        if (overElement.propData.isContainer) {
          if (!overElement.propData.components) {
            overElement.propData.components = [];
          }
          const temp = cloneDeep(
            findElementByPath(pageDataClone.elements, active.id as string)
          );
          temp.path = `${overElement.path}${SPLIT_SYMBOL}${temp.uniqueId}`;
          if (temp.propData.components && temp.propData.components.length > 0) {
            updatePath(temp.propData.components, temp.path);
          }
          parentOfActive.propData.components.splice(activeIndex, 1);
          overElement.propData.components.unshift(temp);
        } else {
          if (!parentOfOver.propData.components) {
            parentOfOver.propData.components = [];
          }
          overIndex = parentOfOver.propData.components.findIndex(
            (item) => item.path === over.id
          );
          const temp = cloneDeep(
            findElementByPath(pageDataClone.elements, active.id as string)
          );
          temp.path = `${parentOfOver.path}${SPLIT_SYMBOL}${temp.uniqueId}`;
          if (temp.propData.components && temp.propData.components.length > 0) {
            updatePath(temp.propData.components, temp.path);
          }
          parentOfActive.propData.components.splice(activeIndex, 1);
          parentOfOver.propData.components.splice(overIndex + 1, 0, temp);
        }
      }
      // TH 3: nếu cha của active là builder và cha của over không phải builder
    } else if (parentOfActive === "builder" && parentOfOver !== "builder") {
      activeIndex = pageDataClone.elements.findIndex(
        (item) => item.path === active.id
      );
      const temp = cloneDeep(
        findElementByPath(pageDataClone.elements, active.id as string)
      );
      if (overElement.propData.isContainer) {
        temp.path = `${overElement.path}${SPLIT_SYMBOL}${temp.uniqueId}`;
        if (temp.propData.components && temp.propData.components.length > 0) {
          updatePath(temp.propData.components, temp.path);
        }
        overElement.propData.components?.unshift(temp);
        pageDataClone.elements.splice(activeIndex, 1);
      } else {
        if (!parentOfOver.propData.components) {
          parentOfOver.propData.components = [];
        }
        overIndex = parentOfOver.propData.components.findIndex(
          (item) => item.path === over.id
        );
        temp.path = `${parentOfOver.path}${SPLIT_SYMBOL}${temp.uniqueId}`;
        if (temp.propData.components && temp.propData.components.length > 0) {
          updatePath(temp.propData.components, temp.path);
        }
        parentOfOver.propData.components.splice(overIndex + 1, 0, temp);
        pageDataClone.elements.splice(activeIndex, 1);
      }
      // TH 4: Nếu cha của active không phải builder và cha của over là builder
    } else if (parentOfActive !== "builder" && parentOfOver === "builder") {
      if (!parentOfActive.propData.components) {
        parentOfActive.propData.components = [];
      }
      activeIndex = parentOfActive.propData.components.findIndex(
        (item) => item.path === active.id
      );

      const temp = cloneDeep(parentOfActive.propData.components[activeIndex]);

      if (overElement.propData.isContainer) {
        temp.path = `${overElement.path}${SPLIT_SYMBOL}${temp.uniqueId}`;
        if (temp.propData.components && temp.propData.components.length > 0) {
          updatePath(temp.propData.components, temp.path);
        }
        parentOfActive.propData.components.splice(activeIndex, 1);
        if (!overElement.propData.components) {
          overElement.propData.components = [];
        }
        overElement.propData.components.unshift(temp);
      } else {
        overIndex = pageDataClone.elements.findIndex(
          (item) => item.path === over.id
        );
        temp.path = temp.uniqueId as string;
        if (temp.propData.components && temp.propData.components.length > 0) {
          updatePath(temp.propData.components, temp.path);
        }
        parentOfActive.propData.components.splice(activeIndex, 1);
        pageDataClone.elements.splice(overIndex + 1, 0, temp);
      }
    }

    const newStorePageData = [...storePageData, pageDataClone];
    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
    });
  };

  // handle add element
  const handleAddElement = (e: MouseEvent) => {
    e.stopPropagation();
    handleUpdateValues({ openModal: true });
  };

  // handle delete
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    handleDeleteElement(builderActivePath as string);
  };

  // handle duplicate
  const handleDuplicate = (e: MouseEvent) => {
    e.stopPropagation();
    handleDuplicateElement(builderActivePath as string);
  };

  // change active parent
  const changeActiveParent = () => {
    const parentOfElement = findParentByPath(
      storePageData[indexPageData].elements,
      builderActivePath as string
    );
    if (!parentOfElement || parentOfElement === "builder") return;
    handleUpdateValues({
      builderActivePath: parentOfElement.path,
      pathWillAdd: parentOfElement.path,
    });
  };

  useEffect(() => {
    if (builderActivePath && builderRef.current) {
      // cập nhật hiển thị các nút
      const parentOfElement = findParentByPath(
        storePageData[indexPageData].elements,
        builderActivePath
      );
      const element = findElementByPath(
        storePageData[indexPageData].elements,
        builderActivePath
      );

      handleUpdateValues({
        actions: {
          ...actions,
          up: parentOfElement !== "builder" && !!parentOfElement,
          add: !!element.propData?.isContainer,
        },
      });

      // cập nhật vị trí của tool
      const builderBouding = builderRef.current?.getBoundingClientRect();
      const activeElement = builderRef.current.querySelector(
        `#${builderActivePath}`
      );

      if (!activeElement) return;
      const bounding = activeElement.getBoundingClientRect();

      if (!bounding) return;

      const top = bounding.top - (builderBouding?.top || 0);
      const left = bounding.left - (builderBouding?.left || 0);

      const wrapper: SxProps = {
        position: "absolute",
        zIndex: 100,
        top,
        left,
        width: bounding.width,
        height: bounding.height,
        backgroundColor: "transparent",
        outline: "2px solid",
        outlineColor: "primary.main",
        transition: "all linear 0.1s",
        pointerEvents: "none",
      };

      // option ra khỏi phần trân của builder
      const optionReachTopBuilder =
        bounding.top - OPTION_HEIGHT < builderBouding.top;

      // option ra khỏi bên trái của builder
      const optionReachLeftBuilder =
        bounding.right - builderBouding.left < OPTION_WIDTH;
      const option: SxProps = {
        bottom: optionReachTopBuilder ? `-${OPTION_HEIGHT}px` : "100%",
        right: !optionReachLeftBuilder ? 0 : "",
        left: optionReachLeftBuilder ? 0 : "",
        justifyContent: optionReachLeftBuilder ? "flex-start" : "flex-end",
      };
      setToolStyle({ wrapper, option });
    } else {
      setToolStyle({ wrapper: {}, option: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderActivePath, load]);

  useEffect(() => {
    handleUpdateValues({ load: load + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePageData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // listen delete event
      if (event.key === "Delete" && builderActivePath) {
        handleDeleteElement(builderActivePath);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "z" && e.ctrlKey) {
        // redo
        if (e.shiftKey) {
          handleRedo();
          // undo
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderActivePath, storePageData, indexPageData]);

  return (
    <Box
      sx={{
        padding: "5px",
      }}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      >
        <SortableContext
          items={
            storePageData[indexPageData]?.elements.map((item) => item.path) ||
            []
          }
          strategy={verticalListSortingStrategy}
        >
          <Stack
            component="section"
            spacing="10px"
            sx={{
              height: "calc(100vh - 50px - 10px)",
              borderRadius: "10px",
              border: "2px dashed",
              borderColor: "grey.100",
            }}
          >
            <Box
              className="hidden-scrollbar"
              sx={{
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <Stack
                ref={builderRef}
                sx={{
                  position: "relative",
                  padding: "10px",
                  minHeight: "100%",
                }}
              >
                {/* tool */}
                {builderActivePath && (
                  <Box sx={toolStyle.wrapper}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing="4px"
                      sx={{
                        position: "absolute",
                        zIndex: 10,
                        width: OPTION_WIDTH,
                        height: OPTION_HEIGHT,
                        pointerEvents: "none",
                        "& button": {
                          pointerEvents: "all",
                        },
                        display: "flex",
                        alignItems: "center",
                        ...toolStyle.option,
                      }}
                    >
                      {actions.up && (
                        <IconButton
                          sx={{
                            backgroundColor: "common.black",
                            color: "common.white",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "common.black",
                            },
                          }}
                          onClick={changeActiveParent}
                        >
                          <MdArrowUpward size={14} />
                        </IconButton>
                      )}
                      <IconButton
                        sx={{
                          backgroundColor: "primary.main",
                          color: "common.white",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: "primary.main",
                          },
                        }}
                        onClick={handleDuplicate}
                      >
                        <HiOutlineDuplicate size={14} />
                      </IconButton>
                      {actions.add && (
                        <IconButton
                          sx={{
                            backgroundColor: "primary.main",
                            color: "common.white",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "primary.main",
                            },
                          }}
                          onClick={handleAddElement}
                        >
                          <MdAddCircleOutline size={14} />
                        </IconButton>
                      )}
                      <IconButton
                        sx={{
                          backgroundColor: "error.main",
                          color: "common.white",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: "error.main",
                          },
                        }}
                        onClick={handleDelete}
                      >
                        <CgTrashEmpty size={14} />
                      </IconButton>
                    </Stack>
                  </Box>
                )}
                {/* tool end */}
                <GenerateElements />
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginTop:
                      storePageData[indexPageData]?.elements?.length > 0
                        ? "10px"
                        : "0px",
                  }}
                >
                  <PlusComponent path="" />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
}
export default Main;
