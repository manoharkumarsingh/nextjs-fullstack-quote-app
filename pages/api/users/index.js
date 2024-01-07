import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import getResponse from "../../../lib/response";
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("graphqldb");
    const User = db.collection("users");
    switch (req.method) {
      case "GET": {
        const user = await User.find().toArray();
        res.status(200).json(getResponse({ data: user }, 200));
        break;
      }
      case "POST": {
        const userNew = req.body.userNew;
        const user = await User.findOne({ email: userNew.email });

        if (user) {
          res
            .status(400)
            .json(
              getResponse(
                { data: {} },
                400,
                `User with email ${userNew.email} already exists.`
              )
            );
        }
        const hashedPassword = await bcrypt.hash(userNew.password, 12);
        const newUser = {
          ...userNew,
          password: hashedPassword,
        };
        await User.insertOne({ ...newUser });
        res.status(201).json(getResponse({ data: newUser }, 201));
        break;
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
