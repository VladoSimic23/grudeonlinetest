// actions.js
"use server";

import { revalidateTag } from "next/cache";

let likeCount: number;

// Check if localStorage is available (client-side)
const localStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

// Check if the page is being loaded for the first time or reloaded
if (localStorageAvailable && !localStorage.getItem("pageLoaded")) {
  // This means the page is being loaded for the first time
  likeCount = 0;
  localStorage.setItem("pageLoaded", "true");
} else {
  // The page is being reloaded or localStorage is not available
  likeCount = parseInt(
    localStorageAvailable ? localStorage.getItem("likeCount") || "0" : "0",
    10
  );
}

export default async function incrementLike(): Promise<number> {
  likeCount += 1;
  revalidateTag("");

  // Update the stored likeCount value in local storage if available
  if (localStorageAvailable) {
    localStorage.setItem("likeCount", likeCount.toString());
  }

  return likeCount;
}

// let likeCount = 0;

// if (performance.navigation.type === 1) {
//   // This means the page is being reloaded (not from cache)
//   likeCount = 0;
// }

// export default async function incrementLike() {
//   likeCount += 1;
//   revalidateTag("");
//   return likeCount;
// }

// let isComment = false;

// export async function isComments() {
//   return !isComment;
// }

// export function serverAction() {
//   return {
//     // Define any initial data or logic here
//     data: false,
//   };
// }
