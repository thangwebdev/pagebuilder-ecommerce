import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface IModalBaseProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose: () => void;
}

export default function ModalBase({
  children,
  title,
  open,
  onClose,
}: IModalBaseProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "6px",
        }}
      >
        <Stack spacing="5px">
          <Stack
            sx={{ height: "40px", padding: "0 10px" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
              {title}
            </Typography>
            <IconButton onClick={onClose}>
              <IoMdClose size={16} />
            </IconButton>
          </Stack>
          {children}
        </Stack>
      </Box>
    </Modal>
  );
}
