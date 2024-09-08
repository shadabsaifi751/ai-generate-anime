import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { prompt } = req.body;

  try {
    const output = await replicate.run(
      // "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
      "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
      {
        input: {
          prompt: `masterpiece, best quality, illustration, beautiful detailed, finely detailed, dramatic light, intricate details, ${prompt}`,
        },
      }
    );
    res.status(200).json({ characters: output });
  } catch (error) {
    console.error("AI anime character generation failed:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    res.status(500).json({ error: "AI anime character generation failed" });
  }
  
}