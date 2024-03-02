"use client";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import RenderComponents from "~/components/ui/RenderComponents";
import Box from "@mui/material/Box";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const elements = searchParams.get("data");
  if (!elements) {
    return (
      <Typography sx={{ textAlign: "center", padding: "20px 0" }}>
        TRANG XEM TRƯỚC
      </Typography>
    );
  }
  const pageData = JSON.parse(elements);

  return (
    <Box sx={{ backgroundColor: "grey.100" }}>
      <RenderComponents components={pageData} />
    </Box>
  );
}
