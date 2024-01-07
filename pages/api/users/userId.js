import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import getResponse from "../../../lib/response";
import jwt from "jsonwebtoken";

const checkAuthorization = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
  return null;
};

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("graphqldb");
    const User = db.collection("users");
    const userId = checkAuthorization(req);

    const user = await User.aggregate([
      {
        $match: { _id: new ObjectId(userId.userId) },
      },
      {
        $lookup: {
          from: "quotes",
          localField: "_id",
          foreignField: "by",
          as: "quotes",
        },
      },
      {
        $unwind: "$quotes", // Unwind the user array (assuming by is a single reference)
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          // Other fields from the Quote collection that you want to include
          "quotes._id": 1,
          "quotes.name": 1,
          "quotes.by": 1,
        },
      },
    ]).toArray();

    // const user = await User.findOne({ _id: new ObjectId(userId.userId) });
    res.status(200).json(getResponse({ user }, 200));
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
