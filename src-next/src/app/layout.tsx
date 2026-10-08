import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Nugget Nihongo · Belajar Bahasa Jepang JLPT",
  description: "Modern Gamified Japanese Learning App untuk penutur bahasa Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-nugget-amber selection:text-black">
        <AppHeader />
        <main className="flex-1 max-w-md mx-auto w-full relative pb-28 px-4 pt-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
