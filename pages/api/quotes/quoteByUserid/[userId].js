import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import getResponse from "../../../../lib/response";
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("graphqldb");
    const Quote = db.collection("quotes");
    const userId = req.query.userId;
    const matchCondition = { by: new ObjectId(userId) };
    const quotes = await Quote.aggregate([
      {
        $match: matchCondition,
      },
      {
        $lookup: {
          from: "users", // The name of the referenced collection
          localField: "by", // The field from the input documents
          foreignField: "_id", // The field from the documents of the "from" collection
          as: "user", // The output array field
        },
      },
      {
        $unwind: "$user", // Unwind the user array (assuming by is a single reference)
      },
      {
        $project: {
          _id: 1,
          name: 1,
          // Other fields from the Quote collection that you want to include
          "user._id": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.email": 1,
        },
      },
    ]).toArray();
    res.status(200).json(getResponse({ quote: quotes }, 200));
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
