import Image from "next/image";
import HeaderSearch from "./header-search";
import HeaderRight from "./header-right";
import Box from "@mui/material/Box";
import Container from "~/components/ui/container";
import Stack from "@mui/material/Stack";

export default function HeaderMain() {
  return (
    <Box sx={{ height: "50px", padding: "5px 0" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={1}
              height={1}
              style={{ width: "auto", height: "auto" }}
            />
          </Box>
          <HeaderSearch />
          <HeaderRight />
        </Stack>
      </Container>
    </Box>
  );
}
