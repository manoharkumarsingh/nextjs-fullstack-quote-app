import clientPromise from "../../../lib/mongodb";
import getResponse from "../../../lib/response";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const checkAuthorization = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
  return null;
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("graphqldb");
  const Quote = db.collection("quotes");
  try {
    switch (req.method) {
      case "GET": {
        const quotes = await Quote.aggregate([
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
            },
          },
        ]).toArray();
        res.status(200).json(getResponse({ quote: quotes }, 200));
        break;
      }
      case "POST": {
        const userId = checkAuthorization(req);
        if (!userId) {
          res.status(401).json(getResponse({}, 401, "You must be logged in"));
        }
        const newQuote = {
          name: req.body.name,
          by: new ObjectId(userId.userId),
        };
        await Quote.insertOne(newQuote);
        res.status(201).json(getResponse({ data: newQuote }, 201));
        break;
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
