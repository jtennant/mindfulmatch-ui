import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/Header";
import Box from '@mui/material/Box';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMatch - Find Your Perfect Therapist",
  description: "Connect with licensed therapists who match your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Header />
          <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
