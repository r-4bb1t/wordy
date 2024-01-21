"use server";

import { cookies } from "next/headers";

export const deleteCookie = async () => {
  cookies().delete("wordy-user");
};
