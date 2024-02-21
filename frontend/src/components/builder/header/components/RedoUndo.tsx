import { IconButton } from "@mui/material";
import { GrRedo, GrUndo } from "react-icons/gr";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { useBuilderContext } from "~/contexts/BuilderProvider";

export default function RedoUndo() {
  const {
    value: { indexPageData, storePageData },
    handleUndo,
    handleRedo,
  } = useBuilderContext();

  return (
    <Stack direction="row" alignItems="center" spacing="5px">
      <Tooltip title="Hoàn tác Ctrl + Z" placement="bottom" arrow>
        <span>
          <IconButton
            disabled={indexPageData === 0}
            sx={{
              borderRadius: "4px",
            }}
            onClick={handleUndo}
          >
            <GrUndo size={16} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Trở lại Ctrl + Shift + Z" placement="bottom" arrow>
        <span>
          <IconButton
            disabled={storePageData.length - 1 === indexPageData}
            sx={{
              borderRadius: "4px",
            }}
            onClick={handleRedo}
          >
            <GrRedo size={16} />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
