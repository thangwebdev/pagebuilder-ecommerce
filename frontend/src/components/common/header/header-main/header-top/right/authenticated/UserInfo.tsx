import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Popup from "~/components/ui/popup";

function UserInfo() {
  return (
    <Popup content={<Box>User info</Box>}>
      <Button
        variant="contained"
        startIcon={<Avatar sx={{ width: "30px", height: "30px" }} />}
        sx={{
          boxShadow: "none",
          backgroundColor: "#00000011",
          height: "42px",
          fontSize: "13px",
          borderRadius: "50px",
          padding: "5px 10px",
          marginLeft: "20px",
          "&:hover": {
            backgroundColor: "#00000011",
            boxShadow: "none",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            maxWidth: "100px",
            textWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "common.white",
          }}
        >
          Võ Minh Thắng
        </Typography>
      </Button>
    </Popup>
  );
}

export default UserInfo;
