"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import Image from "next/image";

const borderRadius = "6px";

export interface IProductProps {
  name: string;
}

function Product({ name = "Product name" }: IProductProps) {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "common.white",
        borderRadius,
        border: "1px solid",
        borderColor: "divider",
        transition: "all linear 0.1s",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Link href="/products">
        <Box
          className="product-img-wrapper"
          sx={{ width: "100%", height: "auto", position: "relative" }}
        >
          {/* Percent */}
          <Stack
            direction="row"
            alignItems="cener"
            justifyContent="center"
            sx={{
              position: "absolute",
              zIndex: 2,
              top: 0,
              left: 0,
              padding: "4px",
              backgroundColor: "error.main",
              borderRadius: `${borderRadius} 0 ${borderRadius} 0`,
            }}
          >
            <Typography fontSize={12} sx={{ color: "common.white" }}>
              -4%
            </Typography>
          </Stack>
          {/* Image */}
          <Box sx={{ paddingTop: "100%", position: "relative", zIndex: 1 }}>
            <Image
              src="/images/product.png"
              alt="product-image"
              width={`${100}`}
              height={`${100}`}
              priority
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: `${borderRadius} ${borderRadius} 0 0`,
              }}
            />
          </Box>
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Stack sx={{ padding: "10px 10px 20px 10px" }} spacing="2px">
            <Stack direction="row" alignItems="center" spacing="10px">
              <Typography
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                sx={{ color: "primary.main" }}
              >
                200.000đ
              </Typography>
              <Typography component="del" fontSize={12}>
                234.600đ
              </Typography>
            </Stack>
            <Typography
              component="span"
              fontSize={14}
              fontWeight={500}
              sx={{
                "&:hover": { color: "primary.main" },
                transition: "all linear 0.1s",
              }}
            >
              {name}
            </Typography>
            <Typography fontSize={10} fontWeight={400}>
              Hộp 15 vỉ x 12 viên nén
            </Typography>
          </Stack>
        </Stack>
      </Link>
      <Link href="/products">
        <Stack spacing="4px" sx={{ marginTop: "auto" }}>
          <Box sx={{ width: "100%", padding: "0 10px" }}>
            <Box
              sx={{
                width: "100%",
                height: "15px",
                backgroundColor: "error.200",
                borderRadius: "10px",
                position: "relative",
                "&:before": {
                  position: "absolute",
                  zIndex: 1,
                  content: "''",
                  top: 0,
                  left: 0,
                  width: "30%",
                  height: "100%",
                  backgroundColor: "error.main",
                  borderRadius: "10px 0 0 10px",
                },
                "&:after": {
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "10px",
                  fontWeight: 500,
                  content: "'Đã bán 1250'",
                  color: "common.white",
                },
              }}
            ></Box>
          </Box>
          <Typography
            fontSize={10}
            fontWeight={400}
            textAlign="center"
            lineHeight={1}
            sx={{ color: "secondary.main" }}
          >
            Đặt tối đa 100 sản phẩm
          </Typography>
        </Stack>
      </Link>
      {/* Add to cart */}
      <Box
        sx={{
          width: "100%",
          height: "34px",
          borderTop: "1px solid",
          borderTopColor: "divider",
          marginTop: "4px",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            xs={3}
            sx={{ borderRight: "1px solid", borderRightColor: "divider" }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <IconButton
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  borderRadius: 0,
                }}
              >
                <LuMinus size={16} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing="2px"
              sx={{ width: "100%", height: "100%" }}
            >
              <Box sx={{ color: "grey.100" }}>
                <LuShoppingCart size={16} />
              </Box>
              <Box
                component="input"
                sx={{
                  border: "none",
                  outline: "none",
                  width: "30px",
                  textAlign: "center",
                  color: "grey.100",
                }}
                value={0}
                onChange={() => {}}
              ></Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ borderLeft: "1px solid", borderLeftColor: "divider" }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <IconButton
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  borderRadius: 0,
                  color: "primary.main",
                }}
              >
                <LuPlus size={16} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Product;
