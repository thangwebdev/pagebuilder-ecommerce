import Footer from "~/components/common/footer";
import Header from "~/components/common/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>{children}</section>
      <Footer />
    </>
  );
}
