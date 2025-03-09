import LoginModal from "@/components/LoginModal";
import ProviderSession from "@/components/providers/ProviderSession";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@/lib/authOptions";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  authors: "Sushanto kumar",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <>
      <html lang="en" data-theme="light">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ProviderSession>
            <ReduxProvider>
              <Toaster />

              <Navbar />
              {session?.user ? (
                <>
                  <div className="flex">
                    {/* sidebar */}
                    <aside>
                      <Sidebar />
                    </aside>

                    {/* main content */}
                    <main className="flex-1 transition-transform duration-500 p-4">
                      {children}
                    </main>
                  </div>
                </>
              ) : (
                <>
                  <LoginModal user={session?.user} />
                </>
              )}
            </ReduxProvider>
          </ProviderSession>
        </body>
      </html>
    </>
  );
}
