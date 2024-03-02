import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { FaCartShopping } from "react-icons/fa6";
import Popup from "~/components/ui/popup";

function Cart() {
  return (
    <Popup title="Giỏ hàng">
      <Badge
        badgeContent={200}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            right: 0,
            top: 10,
          },
        }}
      >
        <IconButton
          sx={{
            color: "common.white",
            marginLeft: "5px",
            width: "42px",
            height: "42px",
            "&:hover": {
              backgroundColor: "unset",
            },
          }}
        >
          <FaCartShopping size={16} />
        </IconButton>
      </Badge>
    </Popup>
  );
}

export default Cart;
