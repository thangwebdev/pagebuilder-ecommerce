import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import Provider from "~/components/common/provider";

const font = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Thuốc giá tốt",
  description: "Thuốc sĩ giá tốt nhất Việt Nam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeRegistry>
          <Provider>
            <>{children}</>
          </Provider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
