import "@/app/global.css";
import { Metadata } from "next";
import { LayoutHeader } from "@/app/components/LayoutHeader"

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <LayoutHeader/>
      <body className={`antialiased  bg-[#00003c] text-white`}>{children}</body>
    </html>
  );
}
