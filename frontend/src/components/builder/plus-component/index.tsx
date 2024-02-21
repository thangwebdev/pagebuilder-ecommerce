import React from "react";
import { Button, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useBuilderContext } from "~/contexts/BuilderProvider";

interface IPlusComponentProps {
  path: string;
}

function PlusComponent({ path }: IPlusComponentProps) {
  const { handleUpdateValues } = useBuilderContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleUpdateValues({ openModal: true, pathWillAdd: path });
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Button
        onClick={handleClick}
        sx={{
          width: "100%",
          maxWidth: "600px",
          height: "42px",
          flexShrink: 0,
          borderRadius: "4px",
          backgroundColor: "divider",
        }}
      >
        <FaPlus size={16} />
      </Button>
    </Stack>
  );
}
export default PlusComponent;
