import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="pb-20 lg:pb-0">
      <Header />
      <main>{children}</main>
      <Footer />
      <div className="fixed bottom-0 left-0 z-40 w-full bg-navy/95 px-4 py-3 lg:hidden">
        <Link
          className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)]"
          href="/join"
        >
          Join Now - First Game Free
        </Link>
      </div>
    </div>
  );
}
