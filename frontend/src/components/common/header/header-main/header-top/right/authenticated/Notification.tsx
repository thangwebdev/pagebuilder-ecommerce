import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { FaBell } from "react-icons/fa6";
import Popup from "~/components/ui/popup";

function Notification() {
  return (
    <Popup title="Thông Báo">
      <Badge
        variant="dot"
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            right: 10,
            top: "30%",
          },
        }}
      >
        <IconButton
          sx={{
            color: "common.white",
            width: "42px",
            height: "42px",
            "&:hover": {
              backgroundColor: "unset",
            },
          }}
        >
          <FaBell size={16} />
        </IconButton>
      </Badge>
    </Popup>
  );
}

export default Notification;
