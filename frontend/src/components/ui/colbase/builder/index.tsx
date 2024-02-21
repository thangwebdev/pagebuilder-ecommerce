"use client";
import dynamic from "next/dynamic";
import ColBase, { IColBaseProps } from "..";
import { SxProps } from "@mui/material";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";

const RenderComponents = dynamic(() => import("../../RenderComponents"));

export interface IColBaseBuilderProps extends IColBaseProps {
  path: string;
  isContainer: boolean;
}

function ColBaseBuilder({
  isContainer,
  path,
  sx,
  orderIds,
  components,
  children,
  ...props
}: IColBaseBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return (
    <ColBase {...builderWrapperProps} {...props} isBuilding>
      {children}
      <SortableContext
        items={components?.map((item) => item.path) || []}
        strategy={
          props.direction === "column"
            ? verticalListSortingStrategy
            : horizontalListSortingStrategy
        }
      >
        <RenderComponents components={components} isBuilding />
      </SortableContext>
    </ColBase>
  );
}

export default ColBaseBuilder;
