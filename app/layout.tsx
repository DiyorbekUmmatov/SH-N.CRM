import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./print-styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/language-provider";
import { SidebarInset } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SH/S.CRM - Smart CRM System",
  description: "Dual Interface Smart CRM System",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <SidebarInset className="flex-1 w-full max-w-full">
                  <main className="w-full max-w-full">{children}</main>
                </SidebarInset>
              </div>
              <Toaster />
            </SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
