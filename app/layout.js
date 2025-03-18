import "./globals.css";
import Image from "next/image";
// import { GoogleTagManager } from '@next/third-parties/google'
// import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto} from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ['400','700','900'] });

export const metadata = {
  title: "AR ATMERICA",
  description: "AR ATMERICA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-fe ${roboto.className}`}>
        <div className="fixed top-0 w-full pointer-events-none z-50">
          <Image src='/frame-top.png' width={375} height={44} alt='Zirolu' className='w-full' priority />
        </div>
        {children}
      </body>
      {/* <GoogleTagManager gtmId="G-3YWLPQZ3JQ" /> */}
      {/* <GoogleAnalytics gaId="G-0X14G8YCL8" /> */}
    </html>
  );
}
