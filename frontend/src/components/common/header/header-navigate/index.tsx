import { MdHelpOutline } from "react-icons/md";
import { LuFileText } from "react-icons/lu";
import { LuUsers2 } from "react-icons/lu";
import { LuHome } from "react-icons/lu";
import Container from "~/components/ui/container";
import Stack from "@mui/material/Stack";
import Button from "~/components/ui/button";
import Box from "@mui/material/Box";

export default function HeaderNavigate() {
  return (
    <Box sx={{ height: "30px" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack
          sx={{ width: "100%", height: "100%" }}
          direction="row"
          columnGap="32px"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            link="https://thangwebdev.click"
            target="_blank"
            startIcon={<MdHelpOutline size={14} />}
            variant="text"
            sx={{ color: "text.primary" }}
          >
            Hướng dẫn đặt hàng
          </Button>
          <Button
            link="https://thangwebdev.click"
            target="_blank"
            startIcon={<LuFileText size={14} />}
            variant="text"
            sx={{ color: "text.primary" }}
          >
            Tin tức
          </Button>
          <Button
            link="https://thangwebdev.click"
            target="_blank"
            startIcon={<LuUsers2 size={14} />}
            variant="text"
            sx={{ color: "text.primary" }}
          >
            Tuyển dụng
          </Button>
          <Button
            link="https://thangwebdev.click"
            target="_blank"
            startIcon={<LuHome size={14} />}
            variant="text"
            sx={{ color: "text.primary" }}
          >
            Đăng ký bán hàng
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
