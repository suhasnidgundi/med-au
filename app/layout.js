import BootstrapClient from "@/libs/BootstrapClient";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { Inter } from 'next/font/google';
import { SessionProvider } from "next-auth/react"
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
        <SessionProvider>
          {/* <Header /> */}
          <main className="container py-4">
            {children}
          </main>
          <Script src="/js/color-modes.js" strategy="beforeInteractive" />
          <BootstrapClient />
        </SessionProvider>
      </body>
    </html>
  );
}
