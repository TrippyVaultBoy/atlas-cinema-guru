import { SignOutButton } from "./SignOutButton";
import { FilmIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";

export async function LayoutHeader() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between text-[#00003c] bg-[#54f4d0] p-4">
      <div className="flex items-center gap-2">
        <FilmIcon width={25} height={25} />
        <span className="w-full">Cinema Guru</span>
      </div>
      <SignOutButton session={session} />
    </div>
  );
}