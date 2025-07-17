import type { Metadata } from "next";
import {Source_Sans_3 as FontSans} from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/common/header";

import Footer from "@/components/ui/common/footer";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200","300", "400", "500", "600", "700","800","900"],
});



export const metadata: Metadata = {
  title: "Solar-AI",
  description: "Document Summarizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
