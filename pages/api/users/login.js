import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getResponse from "../../../lib/response";

export default async function handler(req, res) {
  const userSignin = req.body.userSignin;
  const client = await clientPromise;
  const db = client.db("graphqldb");
  const User = db.collection("users");
  if (req.method === "POST") {
    const user = await User.findOne({ email: userSignin.email });
    if (!user) {
      res
        .status(200)
        .json(getResponse({}, 200, "User doesn't exists with that email"));
    }

    const doMatch = await bcrypt.compare(userSignin.password, user.password);
    if (!doMatch) {
      res
        .status(200)
        .json(getResponse({}, 200, "Email or password is invalid!"));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json(getResponse({ token: token }, 200));
  }
}
