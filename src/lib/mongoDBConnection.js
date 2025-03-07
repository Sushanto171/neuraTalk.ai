import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING);
export const db = client.db(process.env.DATABASE_NAME);
