"use client";
import React from "react";
import Container, { IContainerProps } from "..";
import dynamic from "next/dynamic";
import useBuilderWrapper from "~/hooks/useBuilderWrapper";
import { SxProps } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const RenderComponents = dynamic(() => import("../../RenderComponents"));

interface IContainerBuilder extends IContainerProps {
  path: string;
  isContainer: boolean;
}

function ContainerBuilder({
  path,
  sx,
  orderIds,
  components,
  isContainer,
  children,
  ...props
}: IContainerBuilder) {
  const builderWrapperProps = useBuilderWrapper({
    path,
    sx: sx as SxProps,
    isContainer,
  });

  return (
    <Container {...builderWrapperProps} {...props} isBuilding>
      {children}
      <SortableContext
        items={components?.map((item) => item.path) || []}
        strategy={verticalListSortingStrategy}
      >
        <RenderComponents components={components} isBuilding />
      </SortableContext>
    </Container>
  );
}
export default ContainerBuilder;
