import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 3000;
const MONGOOSE_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_STRING || "";

export { PORT, MONGOOSE_DB_CONNECTION_URL };