import BootstrapClient from "@/libs/BootstrapClient";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ColorModesClient from "@/libs/ColorModesClient";
import Script from "next/script";
import { Inter } from 'next/font/google';
import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Med AI - Virtual Doctor',
  description: 'AI-driven medical consultation for underserved communities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        <main className="container py-4">
          {children}
        </main>
        <BottomNavbar />
        <Script src="/js/color-modes.js" strategy="beforeInteractive" />
        <BootstrapClient />
      </body>
    </html>
  );
}
