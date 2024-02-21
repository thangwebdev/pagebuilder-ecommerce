"use client";
import React from "react";
import Button from "~/components/ui/button";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { useParams } from "next/navigation";

function Publish() {
  const {
    value: { storePageData, indexPageData },
  } = useBuilderContext();

  const params = useParams();

  const handleButtonClick = async () => {
    const currentPageData = storePageData[indexPageData];
    const dataToPut = {
      name: currentPageData.name,
      href: currentPageData.href,
      payload: JSON.stringify(currentPageData),
    };

    const href =
      typeof params.code === "string" ? params : params.code.join("/");
    const res = await fetch(
      `http://localhost:4000/api/v1/grocery/page/query?q=${JSON.stringify({
        href,
      })}`,
      { cache: "no-cache" }
    );
    const pageExisted = await res.json();
    const resp = await fetch(
      `http://localhost:4000/api/v1/grocery/page/${pageExisted._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPut),
      }
    );
    const data = await resp.json();
    console.log(data.data);
  };

  return (
    <Button
      variant="contained"
      width="80"
      unitWidth="px"
      sx={{
        borderRadius: "4px",
      }}
      onClick={handleButtonClick}
    >
      Lưu
    </Button>
  );
}

export default Publish;
