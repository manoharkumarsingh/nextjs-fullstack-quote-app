import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let clientPromise;

if (process.env.MONGO_URI) {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGO_URI, connectionOptions);
    global._mongoClientPromise = client.connect().then(() => {
      console.log("Connected to MongoDB");
      return client;
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.warn(
    "MONGO_URI is not provided. MongoDB connection will not be established."
  );
}

export default clientPromise;
