"use client";
import dynamic from "next/dynamic";
import Row, { IRowProps } from "..";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import { SxProps } from "@mui/material";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const RenderComponents = dynamic(() => import("../../RenderComponents"));

interface IRowBuilderProps extends IRowProps {
  path: string;
  isContainer: boolean;
}

function RowBuilder({
  isContainer,
  path,
  sx,
  components,
  children,
  ...props
}: IRowBuilderProps) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return (
    <Row {...builderWrapperProps} {...props} isBuilding>
      {children}
      <SortableContext
        items={components?.map((item) => item.path) || []}
        strategy={horizontalListSortingStrategy}
      >
        <RenderComponents components={components} isBuilding />
      </SortableContext>
    </Row>
  );
}

export default RowBuilder;
