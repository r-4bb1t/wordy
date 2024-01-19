import "server-only";

import * as admin from "firebase-admin";
import { cert } from "firebase-admin/app";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();