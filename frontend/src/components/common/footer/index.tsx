import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "common.white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "450px",
          height: "450px",
          backgroundColor: "primary.100",
          borderRadius: "100%",
          transform: "translate(-20%, -30%)",
        }}
      ></Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Container>
          <Box sx={{ padding: "20px 0px" }}>
            <Typography sx={{ color: "secondary.main", fontWeight: 400 }}>
              <b>store.vn</b>{" "}
              <span>là website thuộc sở hữu của công ty TNHH Store</span>
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Grid container spacing="20px">
                {/* Column 1 */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Công Ty TNHH Store
                    </Typography>
                    <Stack spacing="10px" sx={{ marginTop: "10px" }}>
                      <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Địa chỉ:
                        </Typography>
                        <Typography>
                          Tầng 8, Tòa Nhà Vincom Center Đồng Khởi, 72 Lê Thánh
                          Tôn, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh,
                          Việt Nam
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Số Chứng Nhận ĐKKD:
                        </Typography>
                        <Typography>
                          0314758651, Cấp Ngày 29/11/2017, Tại Sở Kế Hoạch Và
                          Đầu Tư Thành Phố Hồ Chí Minh
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                          Số Giấy Phép Sàn Thương Mại Điện Tử:
                        </Typography>
                        <Typography>0314758651/KD-0368</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 2 */}
                <Grid item xs={12} sm={6} md={2.5}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Thông Tin Chung
                    </Typography>
                    <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Thông Tin Về store.vn
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Quy Chế Hoạt Động
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Điều Khoản Sử Dụng
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Bảo Mật
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Giải Quyết Khiếu Nại
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Đăng Tải Sản Phẩm
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Đổi Trả
                        </Typography>
                      </Link>
                      <Link href="/">
                        <Typography sx={{ color: "secondary.main" }}>
                          Chính Sách Vận Chuyển
                        </Typography>
                      </Link>
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 3 */}
                <Grid item xs={12} sm={6} md={2.5}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Stack>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Hỗ Trợ Người Sử Dụng
                      </Typography>
                      <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Câu Hỏi Thường Gặp
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Hướng Dẫn Đăng Tải Sản Phẩm
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            Hướng Dẫn Đặt Hàng Và Thanh Toán
                          </Typography>
                        </Link>
                      </Stack>
                    </Stack>
                    <Stack sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Dịch Vụ Giao Hàng
                      </Typography>
                      <Stack
                        direction="row"
                        spacing="5px"
                        sx={{ marginTop: "10px" }}
                      >
                        <Box
                          sx={{ width: "fit-content", height: "fit-content" }}
                        >
                          <Image
                            src="/images/ghtk.png"
                            alt="anh giao hang tiet kiem"
                            width={62}
                            height={24}
                          />
                        </Box>
                        <Box
                          sx={{ width: "fit-content", height: "fit-content" }}
                        >
                          <Image
                            src="/images/ktl.jpg"
                            alt="anh ktl"
                            width={62}
                            height={24}
                          />
                        </Box>
                        <Box
                          sx={{ width: "fit-content", height: "fit-content" }}
                        >
                          <Image
                            src="/images/viettel.jpg"
                            alt="anh viettel"
                            width={62}
                            height={24}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
                {/* Column 4 */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Stack>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Kết Nối Với Chúng Tôi
                      </Typography>
                      <Stack
                        direction="row"
                        spacing="10px"
                        sx={{ marginTop: "10px" }}
                      >
                        <Link href="/" target="_blank">
                          <Image
                            src="/images/facebook.svg"
                            alt="anh facebook"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/images/zalo.svg"
                            alt="anh zalo"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/images/linkedin.svg"
                            alt="anh linkedin"
                            width={25}
                            height={25}
                          />
                        </Link>
                        <Link href="/" target="_blank">
                          <Image
                            src="/images/tiktok.svg"
                            alt="anh tiktok"
                            width={25}
                            height={25}
                          />
                        </Link>
                      </Stack>
                    </Stack>
                    <Stack sx={{ marginTop: "10px" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                        Liên Hệ
                      </Typography>
                      <Stack spacing="5px" sx={{ marginTop: "10px" }}>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            hotro.store@gmail.com
                          </Typography>
                        </Link>
                        <Link href="/">
                          <Typography sx={{ color: "secondary.main" }}>
                            035 8500 xxx (Từ T2 đến CN: 8h-20h)
                          </Typography>
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "20px 0px",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ color: "common.black", textAlign: "center" }}>
              © Bản quyền thuộc Công Ty TNHH Store - 2024
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
