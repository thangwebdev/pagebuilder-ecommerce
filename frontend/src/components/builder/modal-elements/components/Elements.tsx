"use client";
import React, { useDeferredValue, useMemo } from "react";
import GroupElement from "./GroupElement";
import Stack from "@mui/material/Stack";
import { elementGroups } from "~/utils/elements";
import { cloneDeep } from "lodash";

interface IElementsProps {
  search: string;
}

function Elements({ search }: IElementsProps) {
  const deferredSearch = useDeferredValue(search);

  const elementToRender = useMemo(() => {
    const elementToLoop = cloneDeep(elementGroups);
    elementToLoop.forEach((group) => {
      group.elements = group.elements?.filter((el) =>
        el.name.toLowerCase().includes(deferredSearch.toLowerCase())
      );
    });
    return elementToLoop;
  }, [deferredSearch]);

  return (
    <Stack spacing="5px">
      {elementToRender.map((group) => (
        <GroupElement key={group.title} group={group} />
      ))}
    </Stack>
  );
}

export default Elements;
