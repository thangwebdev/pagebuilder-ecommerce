import { IconButton, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdAddCircleOutline } from "react-icons/md";
import { useBuilderContext } from "~/contexts/BuilderProvider";
import { elements } from "~/utils/elements";

function Top() {
  const {
    value: { builderActivePath, actions, storePageData, indexPageData },
    findElementByPath,
    handleUpdateValues,
    handleDuplicateElement,
    handleDeleteElement,
  } = useBuilderContext();

  const currentElement = useMemo(() => {
    if (builderActivePath) {
      const element = findElementByPath(
        storePageData[indexPageData].elements,
        builderActivePath
      );
      const result = elements.find((item) => item.id === element.type);
      return result;
    } else {
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builderActivePath]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: "40px",
        padding: "0px 5px",
        backgroundColor: "primary.100",
      }}
    >
      {!builderActivePath ? (
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          Chưa có phần tử được chọn
        </Typography>
      ) : (
        <>
          <Typography sx={{ fontWeight: 550 }}>
            {currentElement?.displayName || "Cột"}
          </Typography>
          <Stack direction="row" alignItems="center">
            <IconButton
              sx={{
                borderRadius: "4px",
              }}
              onClick={() => {
                handleDuplicateElement(builderActivePath as string);
              }}
            >
              <HiOutlineDuplicate size={14} />
            </IconButton>
            {actions.add && (
              <IconButton
                sx={{
                  borderRadius: "4px",
                }}
                onClick={() => {
                  handleUpdateValues({ openModal: true });
                }}
              >
                <MdAddCircleOutline size={14} />
              </IconButton>
            )}
            <IconButton
              sx={{
                borderRadius: "4px",
                color: "error.main",
              }}
              onClick={() => {
                handleDeleteElement(builderActivePath as string);
              }}
            >
              <CgTrashEmpty size={14} />
            </IconButton>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default Top;
