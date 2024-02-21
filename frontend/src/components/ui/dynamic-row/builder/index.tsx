"use client";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import DynamicRow, { IDynamicRowProps } from "..";
import dynamic from "next/dynamic";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import { SxProps } from "@mui/material";
const RenderComponents = dynamic(() => import("../../RenderComponents"));

interface IDynamicRowBuilderProps extends IDynamicRowProps {
  path: string;
  isContainer: boolean;
}

function DynamicRowBuilder({
  isContainer,
  path,
  sx,
  components,
  children,
  ...props
}: IDynamicRowBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return (
    <DynamicRow {...builderWrapperProps} {...props} isBuilding>
      {children}
      <SortableContext
        items={components?.map((item) => item.path) || []}
        strategy={horizontalListSortingStrategy}
      >
        <RenderComponents components={components} isBuilding />
      </SortableContext>
    </DynamicRow>
  );
}
export default DynamicRowBuilder;
