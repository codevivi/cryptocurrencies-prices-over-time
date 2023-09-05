import { DATABASE_URL, NODE_ENV } from "../config.js";
import mongoose from "mongoose";
let isDb = false;
let db = null;
try {
  mongoose.connect(DATABASE_URL, { dbName: "crypto" });
  db = mongoose.connection;

  db.on("error", (e) => {
    if (NODE_ENV === "development") {
      console.log(e);
    }
  });

  db.once("connected", () => {
    console.log("Database connected");
  });
  isDb = true;
} catch (e) {
  console.log("Database connection problem, but application will keep working, as DB is not mandatory.");
  console.log(e);
}
export const database = db;
export const isDatabase = isDb;
