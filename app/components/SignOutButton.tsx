"use client";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import type { Session } from "next-auth";
import { signOutAction } from "@/lib/signOutAction"; // a server action

type Props = { session: Session | null };

export function SignOutButton({ session }: Props) {
  if (!session?.user?.email) return null;

  return (
    <div
      className="flex gap-2 cursor-pointer items-center"
      // Call server action
      onClick={() => signOutAction()}
    >
      <span>Welcome, {session.user.email}</span>
      <div className="flex gap-2 items-center">
        <ArrowRightEndOnRectangleIcon width={25} height={25} />
        <span>Logout</span>
      </div>
    </div>
  );
}
