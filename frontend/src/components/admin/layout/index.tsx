"use client";
import { Collapse } from "@mui/material";
import { useState } from "react";
import HeaderAdmin from "~/components/admin/header";
import Sidebar from "~/components/admin/sidebar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const sidebarMinWidth = 38;
const sidebarMaxWidth = 220;

export default function WrapperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  const toggleSideBar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Stack direction="row">
      <Collapse
        in={openSidebar}
        collapsedSize={sidebarMinWidth}
        orientation="horizontal"
      >
        <Box>
          <Sidebar
            width={sidebarMaxWidth}
            isOpen={openSidebar}
            setIsOpen={setOpenSidebar}
          />
        </Box>
      </Collapse>
      <Stack sx={{ flexGrow: 1 }}>
        <HeaderAdmin toggleSideBar={toggleSideBar} />
        <Box
          component="section"
          sx={{
            height: "calc(100vh - 40px)",
            padding: "10px",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
