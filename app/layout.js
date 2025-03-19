import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Relive The Apollo Program - atamerica",
  description: "AR Gamification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-fe ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed top-0 w-full pointer-events-none z-50">
          <Image src='/frame-top.png' width={750} height={88} alt='Zirolu' className='w-full' priority />
        </div>
        {children}
      </body>
    </html>
  );
}
