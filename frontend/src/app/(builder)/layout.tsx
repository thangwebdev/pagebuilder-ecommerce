import { Metadata } from "next";
import BuilderProvider from "~/contexts/BuilderProvider";

export const metadata: Metadata = {
  title: "Thuốc giá tốt - builder",
  description: "Thuốc sĩ giá tốt nhất Việt Nam",
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BuilderProvider>{children}</BuilderProvider>;
}
