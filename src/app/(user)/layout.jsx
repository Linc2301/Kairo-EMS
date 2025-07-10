"use client";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import Footer from "@/src/components/footer"
import Header from "@/src/components/navbar"
import { CssBaseline } from "@mui/material";


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
      <body
        className={`${openSans.variable} ${raleway.variable} antialiased`}
      >
        <CssBaseline/>
        <Header />
        {children}
        <Footer />
        
      </body>
    </html>
  );
}
