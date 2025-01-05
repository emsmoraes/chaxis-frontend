import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./_providers/theme-provider";
import Navbar from "./_components/Navbar";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Chaxis",
  description: "Encontre o veículo ideal com 100% de segurança",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className={`pb-16 antialiased`}>
            <Navbar />
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
