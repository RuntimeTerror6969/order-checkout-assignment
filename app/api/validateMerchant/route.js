import { MongoClient } from "mongodb";

export async function POST(request) {
  const { merchantID } = await request.json();
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const merchant = await db
      .collection("OnboardedMerchants")
      .findOne({ merchantID });

    if (!merchant) {
      return new Response(JSON.stringify({ error: "Merchant not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        logo: merchant.merchantLogo.toString("base64"),
        exists: true,
      })
    );
  } finally {
    await client.close();
  }
}
