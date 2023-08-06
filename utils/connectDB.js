import { connect, connections } from "mongoose";
import { response } from "./api";

const connectDB = async (res) => {
  const MONGO_URL = process.env.MONGO_URL;
  if (connections[0].readyState) return;
  connect(MONGO_URL)
    .then(() => console.log("connected to database"))
    .catch((error) => response(res, 500, error.message));
};

export default connectDB;
