import { SignOutButton } from "./SignOutButton";
import { FilmIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import Link from "next/link";

export async function LayoutHeader() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between text-[#00003c] bg-[#54f4d0] p-4">
      <Link href={"/"} className="flex items-center gap-2">
        <FilmIcon width={25} height={25} />
        <span className="w-full text-2xl font-bold">Cinema Guru</span>
      </Link>
      <SignOutButton session={session} />
    </div>
  );
}