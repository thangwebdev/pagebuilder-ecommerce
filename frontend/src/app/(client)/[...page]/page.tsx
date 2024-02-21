import RenderComponents from "~/components/ui/RenderComponents";

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
  const data = await getPageData(params.page.join("/"));

  return <RenderComponents components={data} />;
}
