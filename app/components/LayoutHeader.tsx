import { auth } from "@/auth";

import {
  FilmIcon
} from "@heroicons/react/24/outline";

export async function LayoutHeader() {
    const session = await auth();

    if (!session?.user) return null;
    
    return (
        <header>
            <div className="flex items-center justify-between text-[#00003c] bg-[#54f4d0]">
                <div className="flex items-center gap-2">
                    <FilmIcon width={25} height={25}/>
                    <span className="w-full">Cinema Guru</span>
                </div>
                <div>
                    <span>Welcome, {session.user.email}</span>
                </div>
            </div>
        </header>
    );
}