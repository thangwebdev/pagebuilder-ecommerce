"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "~/components/builder/header";
import Grid from "@mui/material/Grid";
import Main from "~/components/builder/main";
import Sidebar from "~/components/builder/sidebar";
import { useParams } from "next/navigation";
import { useBuilderContext } from "~/contexts/BuilderProvider";

function BuilderPage() {
  const param = useParams();
  const { handleUpdateValues } = useBuilderContext();

  const [mounted, setMounted] = useState<boolean>(false);

  const handleGetPage = async (href: string) => {
    // const query = { href };
    // const result = await fetch(
    //   `http://localhost:4000/api/v1/grocery/page/query?q=${JSON.stringify(
    //     query
    //   )}`
    // );
    // if (result && result.status === 200) {
    //   const currentPageData = await result.json();
    //   const payload = currentPageData.payload;

    //   const pageData = JSON.parse(payload || 0) || {
    //     name: currentPageData.name || "Page name",
    //     href: currentPageData.href || "Page href",
    //     elements: [],
    //   };

    //   handleUpdateValues({ storePageData: [pageData], indexPageData: 0 });
    // }
    handleUpdateValues({
      storePageData: [{ name: "Page name", href: "home", elements: [] }],
      indexPageData: 0,
    });
  };

  useEffect(() => {
    if (param && Array.isArray(param.code) && param.code?.length > 0) {
      const href = param.code.join("/");
      handleGetPage(href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box>
      <Header />
      <Box sx={{ height: "calc(100vh - 50px)" }}>
        <Grid container>
          <Grid item xs={12} md={8.5} lg={9}>
            <Main />
          </Grid>
          <Grid item xs={12} md={3.5} lg={3}>
            <Sidebar />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default BuilderPage;
