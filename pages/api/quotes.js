import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("graphqldb");
    const Quote = db.collection("quotes");
    const quote = await Quote.find({}).toArray();
    res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        quote,
      },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
