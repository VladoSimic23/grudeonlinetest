"use server";
import kv from "@vercel/kv";
import { revalidatePath } from "next/cache";
let currentAmount = 0;

export async function updateNumOfPosts(amount: number) {
  amount += 10;
  console.log(`Updated amount: ${amount}`);
  // You can perform any other tasks here if needed

  // If you want to return the updated amount, you can do so
  await amount;
}
