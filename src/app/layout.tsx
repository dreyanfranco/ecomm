import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import SessionProvider from "./SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecomm",
  description: "Ecomm app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SessionProvider>
            <Navbar />
            <main className="m-auto min-w-[300px] max-w-7xl p-4">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
