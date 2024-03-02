import { MdArrowBack } from "react-icons/md";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Devices from "./components/Devices";
import RedoUndo from "./components/RedoUndo";
import PageName from "./components/PageName";
import Publish from "./components/Publish";
import { VscClearAll } from "react-icons/vsc";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { cloneDeep } from "lodash";

export default function Header() {
  const {
    value: { storePageData, indexPageData },
    handleUpdateValues,
  } = useBuilderContext();

  const handleClearPage = () => {
    const pageDataClone = cloneDeep(storePageData[indexPageData]);
    pageDataClone.elements = [];
    const newStorePageData = [...storePageData, pageDataClone];

    handleUpdateValues({
      storePageData: newStorePageData,
      indexPageData: newStorePageData.length - 1,
      builderActivePath: "",
    });
  };

  return (
    <Box component="header">
      <Stack
        direction="row"
        sx={{
          height: "50px",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Back */}
        <Stack
          sx={{
            width: "50px",
            height: "50px",
            borderRight: "1px solid",
            borderColor: "divider",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Tooltip title="Back" placement="bottom" arrow>
            <IconButton>
              <MdArrowBack size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
        {/* Header main */}
        <Stack
          sx={{ height: "50px", flexGrow: 1, padding: "0px 10px" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Name and href */}
          <PageName />
          {/* Devices */}
          <Devices />
          {/* Actions */}
          <Stack
            sx={{ flex: 1 }}
            direction="row"
            spacing="10px"
            justifyContent="flex-end"
          >
            {/* redo and undo */}
            <RedoUndo />
            {/* Refresh */}
            <Tooltip title="Làm mới" placement="bottom" arrow>
              <IconButton
                sx={{ borderRadius: "4px", backgroundColor: "divider" }}
                onClick={handleClearPage}
              >
                <VscClearAll size={16} />
              </IconButton>
            </Tooltip>
            {/* Publish */}
            <Publish />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
