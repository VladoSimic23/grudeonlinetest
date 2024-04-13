import { NextRequest, NextResponse } from "next/server";
import {
  triggerRevalidateForAllPages,
  triggerRevalidateForPage,
} from "@/app/lib/helpers";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const payload = body || {};

      if (payload.post_status === "publish") {
        await triggerRevalidateForAllPages();

        payload?.categorie.map(async (item: any) => {
          await triggerRevalidateForPage(`category/${item}`);
          await triggerRevalidateForPage(
            `category/${item}/${payload.dynamic_segment}`
          );
        });
      }
      if (payload.post_status === "trash") {
        await triggerRevalidateForAllPages();
        await triggerRevalidateForPage(payload.post_title);
        payload?.categorie.map(async (item: any) => {
          await triggerRevalidateForPage(`category/${item}`);
        });
      }

      NextResponse.json({ message: "Webhook received and processed" }); // Send JSON response
    } catch (error) {
      console.error("Error processing webhook:", error);
      NextResponse.json({ message: error });
    }
  } else {
    NextResponse.json({ message: "Method Not Allowed" });
  }
  return NextResponse.json({ message: "Nothing !" });
}
