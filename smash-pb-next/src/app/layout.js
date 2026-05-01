import { Bebas_Neue, DM_Sans } from "next/font/google";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "SMASH Pickleball Club | Play. Connect. Compete.",
  description:
    "Join the most welcoming pickleball community in Metro Manila. Sessions for all skill levels. First game free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-off-white text-navy font-body antialiased pb-20 lg:pb-0">
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
      </body>
    </html>
  );
}
