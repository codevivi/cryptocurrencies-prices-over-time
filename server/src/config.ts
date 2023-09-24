import env from "dotenv";
env.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const CLIENT = process.env.CLIENT;
export const DATABASE_URL = process.env.DATABASE_URL;
