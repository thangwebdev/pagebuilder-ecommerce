import { Box, Container } from "@mui/material";
import RenderComponents from "~/components/ui/RenderComponents";
import Carousel from "~/components/ui/carousel";
import CarouselProduct from "~/components/ui/carousel-product";

const getPageData = async (href: string) => {
  const res = await fetch(
    `http://localhost:4000/api/v1/grocery/page/query?q=${JSON.stringify({
      href,
    })}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const pageData = JSON.parse(data.payload || "{}");
  return pageData?.elements || [];
};

export default async function DinamicPage({
  params,
}: {
  params: { page: string[] };
}) {
  // const data = await getPageData(params.page.join("/"));

  // return <RenderComponents components={data} />;
  return (
    <Box>
      <Container maxWidth="xl">
        <Carousel />
        <Box sx={{ padding: "10px 0" }}>
          <CarouselProduct title="Discount" />
        </Box>
      </Container>
    </Box>
  );
}
