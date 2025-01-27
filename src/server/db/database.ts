import dotenv from 'dotenv';
dotenv.config();

// Import and initialize models and associations
import "../src/models";

import { Sequelize } from "sequelize";
import { sequelize } from "../src/models/index.js"; // Import the Sequelize instance from models/index.ts

import * as usersSeed from "../sequelize_seeds/usersSeed.js";
import * as reactionsSeed from "../sequelize_seeds/reactionsSeed.js";
import * as categoriesSeed from "../sequelize_seeds/categoriesSeed.js";
import * as pagesSeed from "../sequelize_seeds/pagesSeed.js";
import * as contentSeed from "../sequelize_seeds/contentSeed.js";
import * as commentsSeed from "../sequelize_seeds/commentsSeed.js";

const adminSequelize = new Sequelize(
  "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export async function initializeDatabase() {
  const dbName = process.env.DB_NAME || "hyrule_db";

  try {
    // Verify database existence
    console.log("Verifying database exists...");
    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      { bind: [dbName] }
    );

    if (!results.length) {
      console.log(`Database ${dbName} does not exist. Creating...`);
      await adminSequelize.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created.`);
    } else {
      console.log(`Database ${dbName} exists.`);
    }

    // Authenticate target database connection
    await sequelize.authenticate();
    console.log("Connection to target database established successfully.");

    // Sync models
    console.log("Synchronizing models...");
    await sequelize.sync({ alter: true });
    console.log("All models synchronized.");

    // Seed data
    console.log("Starting seeding process...");
    const queryInterface = sequelize.getQueryInterface();

    try {
      console.log("Seeding users...");
      await usersSeed.up(queryInterface);

      console.log("Seeding reactions...");
      await reactionsSeed.up(queryInterface);

      console.log("Seeding categories...");
      await categoriesSeed.up(queryInterface);

      console.log("Seeding pages...");
      await pagesSeed.up(queryInterface);

      console.log("Seeding content...");
      await contentSeed.up(queryInterface);

      console.log("Seeding comments...");
      await commentsSeed.up(queryInterface);

      console.log("Seeding completed successfully.");
    } catch (seedErr) {
      console.error("Error during seeding:", seedErr);
      throw seedErr;
    }
  } catch (err) {
    console.error("Error during database setup:", err);
    throw err;
  } finally {
    // Close admin connection
    await adminSequelize.close();
    console.log("Admin connection closed.");
  }
}

export { sequelize };