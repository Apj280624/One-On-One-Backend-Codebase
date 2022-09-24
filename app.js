import express from "express";
const app = express();
import cors from "cors";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

// MongoDB
import { MongoClient } from "mongodb";
const mongoClient = new MongoClient(process.env.MONGODB_URI);
import users from "./Collections/User.js";

// middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json()); // to parse json request from axios to js object

// my modules
import { SERVER_ROUTES_LAYER_1 } from "./utilities/Vars.js";

// my DAOs
import UserDAO from "./DAOs/User.js";

// my routers
import authRouter from "./routers/Auth.js";

// Todo: gitignore, validate creds

////////////////////////////////////////////////////////////////////////////////////////////////

app.use(SERVER_ROUTES_LAYER_1.AUTH, authRouter);

/////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function
async function recreateCollection(coll, database) {
  /**
   * * both drop and create collection will remain in independent try/catch blocks
   * * so even if there's no such collection, drop will generate an independently-handled error
   * * which will not kill the create process
   */

  try {
    // Drop collection
    const dropRes = await database.collection(coll.name).drop();
    // console.log(dropRes);
    console.log(`${coll.name} collection successfully dropped`);
  } catch (err) {
    console.log(err);
  }

  try {
    // Create collection
    const createRes = await database.createCollection(
      coll.name,
      coll.validator
    );
    // console.log(createRes);
    console.log(`${coll.name} collection successfully created`);

    // Create index
    const indexRes = await database
      .collection(coll.name)
      .createIndex({ username: 1 }, { unique: true });
    // console.log(indexRes);
    console.log(`Index sucessfully created for ${coll.name} collection`);
  } catch (err) {
    console.log(err);
  }
}

async function init() {
  await mongoClient.connect();
  console.log("Connected successfully to MongoDB");

  // Get db
  const database = mongoClient.db(process.env.DB_NAME);

  // Create collections, only for the first time, recreate only for development purposes
  // recreateCollection(users, database);

  // Get collections
  const usersColl = database.collection(users.name);

  // Initialize DAOs
  UserDAO.init(usersColl);

  app.listen(port, () => {
    console.log(`Game server is listening on port ${port}`);
  });
}

init().catch(console.dir);
