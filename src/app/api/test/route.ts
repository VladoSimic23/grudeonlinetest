// "use server";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
//import { parseBody } from "next/dist/server/api-utils";
import { BodyParser } from "body-parser";
import { revalidatePath } from "next/cache";
import {
  triggerRevalidateForAllPages,
  triggerRevalidateForPage,
} from "@/app/lib/helpers";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const payload = body || {};
      console.log(payload);

      //const payload = req.body; // Assuming WordPress sends post data
      // Handle the payload from WordPress and trigger revalidation or any other necessary action
      // console.log("Received webhook payload:", payload);
      // console.log(payload.post.post_name);

      // Trigger revalidation or any other action based on the payload
      //await triggerRevalidateForAllPages();
      if (payload.post_status === "publish") {
        await triggerRevalidateForAllPages();
        await triggerRevalidateForPage(payload.post_name);
        await triggerRevalidateForPage(payload.post_title);
        await triggerRevalidateForPage("category");
        await triggerRevalidateForPage(payload.dynamic_segment);

        payload?.categorie.map(async (item: any) => {
          await triggerRevalidateForPage(`category/${item}`);
        });
      }
      if (payload.post_status === "trash") {
        // const arr = [payload.taxonomies.keys()];
        // console.log(arr);

        await triggerRevalidateForAllPages();
        await triggerRevalidateForPage(payload.post_title);
        //await triggerRevalidateForPage(`category`);
        payload?.categorie.map(async (item: any) => {
          await triggerRevalidateForPage(`category/${item}`);
        });
      }

      NextResponse.json({ message: "Webhook received and processed" }); // Send JSON response
    } catch (error) {
      console.error("Error processing webhook:", error);
      NextResponse.json({ message: error });
      //res.json({ message: "Internal Server Error" }, { status: 500 }); // Send JSON response
    }
  } else {
    //res.statusCode = 405; // Set HTTP status code to 405
    //res.json({ message: "Method Not Allowed" }, { status: 405 }); // Send JSON response
    NextResponse.json({ message: "Method Not Allowed" });
  }
  return NextResponse.json({ message: "Nothing !" });
}

// export async function handlerGet(req: NextApiRequest, res: NextApiResponse) {
//   // Your GET method logic here
// }

// async function triggerRevalidateForPage(pagePath: any) {
//   revalidatePath(`/${pagePath}`);
// }

// async function triggerRevalidateForAllPages() {
//   revalidatePath("/");
// }
