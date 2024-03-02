import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import NavItem from "./nav-item";

const navItems = [
  {
    id: "san-pham",
    text: "Sản phẩm",
    href: "/products",
    imageUrl: "/images/product.svg",
    activeImageUrl: "/images/product_active.svg",
    active: true,
  },
  {
    id: "hoat-chat",
    text: "Hoạt chất",
    href: "/hoat-chat",
    imageUrl: "/images/hoat_chat.svg",
  },
  {
    id: "dat-hang-nhanh",
    text: "Đặt hàng nhanh",
    href: "/dat-hang-nhanh",
    imageUrl: "/images/dat_hang_nhanh.svg",
  },
];

function HeaderNav() {
  return (
    <Box sx={{ backgroundColor: "common.white" }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          spacing="40px"
          sx={{ height: "40px" }}
        >
          {navItems.map(({ id, text, ...rest }) => (
            <NavItem key={id} {...rest}>
              {text}
            </NavItem>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default HeaderNav;
