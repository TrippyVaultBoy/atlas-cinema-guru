"use server"; // server action

import { signOut } from "@/auth";

export async function signOutAction() {
  await signOut();
}