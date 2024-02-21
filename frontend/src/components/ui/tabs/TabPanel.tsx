import { Box } from "@mui/material";

export interface ITabPanelProps {
  children?: React.ReactNode;
  id: number;
  value: number;
}

function TabPanel({ children, id, value, ...props }: ITabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
      {...props}
    >
      {value === id && <Box>{children}</Box>}
    </div>
  );
}

export default TabPanel;
