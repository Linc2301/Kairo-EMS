"use client";

import "./globals.css";
import Footer from "@/src/components/footer";
import Header from "@/src/components/navbar";
import { Box, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}>
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
