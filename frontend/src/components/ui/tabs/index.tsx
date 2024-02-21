import React, { useState } from "react";
import { Box, SxProps } from "@mui/material";
import { Tabs as MuiTabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export type LabelType = {
  id: number;
  label: string;
};

export type PanelType = {
  id: number;
  children: React.ReactNode;
};

export interface ITabsProps {
  labels: LabelType[];
  panels: PanelType[];
  tabStyle?: SxProps;
}

function Tabs({ labels, panels, tabStyle }: ITabsProps) {
  const [value, setValue] = useState<number>(labels[0].id);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            minHeight: "unset",
            height: "auto",
          }}
        >
          {labels?.length > 0 &&
            labels.map((label) => (
              <Tab
                key={label.id}
                label={label.label}
                {...a11yProps(label.id)}
                sx={{
                  padding: 0,
                  minHeight: "unset",
                  height: "42px",
                  ...tabStyle,
                }}
              />
            ))}
        </MuiTabs>
      </Box>
      {panels?.length > 0 &&
        panels.map((panel) => (
          <TabPanel key={panel.id} value={value} id={panel.id}>
            {panel.children}
          </TabPanel>
        ))}
    </Box>
  );
}
export default Tabs;
