import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import getResponse from "../../../lib/response";
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("graphqldb");
    const User = db.collection("users");
    const userId = req.query.userId;
    const user = await User.findOne({ _id: new ObjectId(userId) });
    res.status(200).json(getResponse({ user }, 200));
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
