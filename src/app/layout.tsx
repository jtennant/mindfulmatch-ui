import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/Header";
import Box from '@mui/material/Box';
import { AuthProvider } from "@/context/AuthContext";

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
          <AuthProvider>
            <Header />
            <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)' }}>
              {children}
            </Box>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
