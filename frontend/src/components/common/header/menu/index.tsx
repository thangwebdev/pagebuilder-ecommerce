import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "./MenuItem";
import Container from "@mui/material/Container";

const menus = [
  {
    href: "/products",
    src: "/images/product.svg",
    title: "Sản Phẩm",
  },
  {
    href: "/hoat-chat",
    src: "/images/hoat_chat.svg",
    title: "Hoạt Chất",
  },
  {
    href: "/dat-hang-nhanh",
    src: "/images/dat_hang_nhanh.svg",
    title: "Đặt Hàng Nhanh",
  },
  {
    href: "/khuyen-mai",
    src: "/images/khuyen_mai.svg",
    title: "Khuyến Mãi",
  },
  {
    href: "/ma-giam-gia",
    src: "/images/ma_giam_gia.svg",
    title: "Mã giảm giá",
  },
  {
    href: "/nha-ban-hang",
    src: "/images/nha_ban_hang.svg",
    title: "Nhà Bán Hàng",
  },
];

export default function Menu() {
  return (
    <Box sx={{ height: "40px", backgroundColor: "primary.main" }}>
      <Container sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
          columnGap="15px"
        >
          {menus.map((menu) => (
            <MenuItem
              key={menu.href}
              href={menu.href}
              icon={
                <Image
                  src={menu.src}
                  alt=""
                  width={1}
                  height={1}
                  style={{ width: "auto", height: "auto" }}
                />
              }
            >
              {menu.title}
            </MenuItem>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
