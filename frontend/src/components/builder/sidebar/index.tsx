import { Box, Paper, Stack } from "@mui/material";
import Top from "./components/top";
import PropertyTabs from "./components/property-tab";
import { useBuilderContext } from "~/contexts/BuilderProvider";

function Sidebar() {
  const {
    value: { builderActivePath },
  } = useBuilderContext();

  return (
    <Box
      sx={{
        padding: "5px 5px 5px 0",
      }}
    >
      <Paper>
        <Stack
          sx={{
            height: "calc(100vh - 50px - 10px)",
          }}
        >
          <Top />
          {!!builderActivePath && (
            <>
              <PropertyTabs />
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
export default Sidebar;
