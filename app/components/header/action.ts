"use server";

import { cookies } from "next/headers";

export async function toggle() {
  cookies().set(
    "theme",
    cookies().get("theme")?.value === "light" ? "dark" : "light"
  );
}
