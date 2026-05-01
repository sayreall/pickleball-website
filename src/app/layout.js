import { Bebas_Neue, DM_Sans } from "next/font/google";
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
  title: "DeucePB | Play. Connect. Compete.",
  description:
    "Join the most welcoming pickleball community in Metro Manila. Sessions for all skill levels. First game free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-off-white text-navy font-body antialiased">
        {children}
      </body>
    </html>
  );
}
