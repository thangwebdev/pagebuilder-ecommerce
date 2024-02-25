"use client";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import RenderComponents from "~/components/ui/RenderComponents";

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

  return <RenderComponents components={JSON.parse(elements)} />;
}
