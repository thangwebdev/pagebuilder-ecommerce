import Box from "@mui/material/Box";
import Container from "~/components/ui/container";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ height: "100px", backgroundColor: "secondary.200" }}
    >
      <Container>
        <Box>Footer</Box>
      </Container>
    </Box>
  );
}
