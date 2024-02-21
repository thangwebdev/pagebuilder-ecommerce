import Stack from "@mui/material/Stack";
import { FaRegBell } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

export default function HeaderRight() {
  return (
    <Stack direction="row" alignItems="center" columnGap="20px">
      <Stack direction="row" alignItems="center">
        <Tooltip title="Thông báo" arrow placement="bottom">
          <IconButton sx={{ color: "secondary.main" }}>
            <FaRegBell size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Giỏ hàng" arrow placement="bottom">
          <IconButton sx={{ color: "secondary.main" }}>
            <LuShoppingCart size={20} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{
            backgroundColor: "secondary.main",
            width: "30px",
            height: "30px",
          }}
        >
          T
        </Avatar>
      </Stack>
    </Stack>
  );
}
