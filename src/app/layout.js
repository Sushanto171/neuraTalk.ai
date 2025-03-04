import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeuraTalk.ai",
  description: "AI-powered smart chat assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="flex h-[200000px] ">
          {/* sidebar */}
          <aside>
            <Sidebar />
          </aside>

          {/* main content */}
          <main className="flex-1 transition-transform duration-500">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
