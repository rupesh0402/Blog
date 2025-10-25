import mongoose from "mongoose";
import { MONGOOSE_DB_CONNECTION_URL } from "./config.js";

mongoose.connect(MONGOOSE_DB_CONNECTION_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default mongoose;