import { DATABASE_URL, NODE_ENV } from "../config.js";
import mongoose from "mongoose";
let isDb = false;
let db = null;
try {
    if (DATABASE_URL) {
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
    }
}
catch (e) {
    console.log(e);
}
export const database = db;
export const isDatabase = isDb;
