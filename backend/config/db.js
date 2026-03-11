import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    console.error(
      "Missing MONGO_URL environment variable. Add it to your .env file.",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
