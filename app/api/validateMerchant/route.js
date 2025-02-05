import { MongoClient } from "mongodb";

// Cache the MongoClient across invocations.
// In a Vercel serverless function, this variable will persist between invocations (if the container is warm)
let cachedClient = null;

async function getClient() {
  if (!cachedClient) {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient;
}

export async function POST(request) {
  try {
    const { merchantID } = await request.json();
    const client = await getClient();
    const db = client.db(); // Uses the database defined in your URI
    const merchant = await db
      .collection("OnboardedMerchants")
      .findOne({ merchantID });

    if (!merchant) {
      return new Response(JSON.stringify({ error: "Merchant not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If merchant.merchantLogo is stored as binary data, convert it to a base64 string.
    // Otherwise, if it is already a base64 string or URL, just pass it along.
    const logo = Buffer.isBuffer(merchant.merchantLogo)
      ? merchant.merchantLogo.toString("base64")
      : merchant.merchantLogo;

    return new Response(
      JSON.stringify({
        logo,
        exists: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in /api/validateMerchant:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
