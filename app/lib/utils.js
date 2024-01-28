import mongoose from "mongoose";

// const connection = {};

// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return;
//     const db = await mongoose.connect(process.env.MONGODB_URI);
//     connection.isConnected = db.connections[0].readyState;
//     console.log("Connected to DB");
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDB = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "bookmyevent",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
