import { Metadata } from "next";
import WrapperAdminLayout from "~/components/admin/layout";

export const metadata: Metadata = {
  title: "Thuốc giá tốt - quản trị",
  description: "Thuốc sĩ giá tốt nhất Việt Nam",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WrapperAdminLayout>{children}</WrapperAdminLayout>;
}
