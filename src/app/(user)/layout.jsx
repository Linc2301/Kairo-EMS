"use client";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import Footer from "@/src/components/footer";
import Header from "@/src/components/navbar";
import { Box, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${raleway.variable} antialiased`}>
        <CssBaseline />
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
