import "@/app/global.css";
import { Metadata } from "next";
import { LayoutHeader } from "@/app/components/LayoutHeader"
import LayoutSidebar from "@/app/components/LayoutSidebar";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`h-full w-full antialiased  bg-[#00003c] text-white`}>
        <LayoutHeader/>
        <div className="flex h-full w-full">
          <LayoutSidebar/>
          {children}
        </div>
      </body>
    </html>
  );
}
