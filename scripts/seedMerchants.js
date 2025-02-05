require("dotenv").config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const sharp = require("sharp");

async function generateLogoBuffer(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return sharp(response.data).resize(100, 100).toBuffer();
}

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("payment_gateway");
    const collection = db.collection("OnboardedMerchants");

    const merchants = [
      {
        merchantID: `MID${uuidv4().replace(/-/g, "").substring(0, 12)}`,
        merchantLogo: await generateLogoBuffer(
          "https://www.apple.com/ac/structured-data/images/open_graph_logo.png"
        ),
      },
      {
        merchantID: `MID${uuidv4().replace(/-/g, "").substring(0, 12)}`,
        merchantLogo: await generateLogoBuffer(
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        ),
      },
    ];

    await collection.insertMany(merchants);
    console.log("Merchants seeded:", merchants);
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
