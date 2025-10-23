import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "CredVora",
  description: "Solution for your financial needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster position="top-center" richColors/>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
