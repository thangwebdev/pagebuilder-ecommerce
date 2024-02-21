import HeaderNavigate from "./header-navigate";
import HeaderMain from "./header-main";
import Box from "@mui/material/Box";
import Menu from "./menu";

export default function Header() {
  return (
    <Box component="header">
      <HeaderNavigate />
      <HeaderMain />
      <Menu />
    </Box>
  );
}
