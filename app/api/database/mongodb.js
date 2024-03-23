import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("seroja");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export { connectToDatabase };
