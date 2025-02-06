import dotenv from 'dotenv';
dotenv.config();

// Import and initialize models and associations
import "../src/models/index.js";

import { Sequelize } from "sequelize";
import { sequelize } from "../src/models/index.js"; // Import the Sequelize instance from models/index.ts

// Import Umzug and path for migration handling
import { Umzug, SequelizeStorage } from "umzug";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as usersSeed from "../src/sequelize_seeds/usersSeed.js";
import * as reactionsSeed from "../src/sequelize_seeds/reactionsSeed.js";
import * as categoriesSeed from "../src/sequelize_seeds/categoriesSeed.js";
import * as pagesSeed from "../src/sequelize_seeds/pagesSeed.js";
import * as contentSeed from "../src/sequelize_seeds/contentSeed.js";
import * as commentsSeed from "../src/sequelize_seeds/commentsSeed.js";
import * as commentReactionsSeed from "../src/sequelize_seeds/commentReactionsSeed.js";
import * as pageCategoriesSeed from "../src/sequelize_seeds/pageCategoriesSeed.js";

const adminSequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    logging: false,
  }
);

// Initialize Umzug instance for migrations
const migrator = new Umzug({
  migrations: { glob: path.join(__dirname, '../src/migrations/content-contributor-migrations.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console, // Logs migration status
});

// Initialize the Database
export async function initializeDatabase() {
  const dbName = process.env.DB_NAME!;
  const forceReseed = process.env.DB_RESEED === 'true';

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

    // Migrate database
    // console.log("Running migrations...");
    // await migrator.up();
    // console.log("All migrations executed successfully.");

    // Sync models
    console.log("Synchronizing models...");
    if (forceReseed) {
      // Force deletion of all tables
      await sequelize.drop();
      await sequelize.sync({ force: true });
      console.log("All tables dropped and recreated.");
    } else {
      await sequelize.sync({ alter: true });
      console.log("All models synchronized.");
    }

    // Check if seeding already applied when forceReseed is false
    if (!forceReseed) {
      // Using 'Users' table as an example to verify if seeding happened
      const [usersData]: any = await sequelize.query('SELECT COUNT(*) AS count FROM "Users"');
      const count = parseInt(usersData[0].count, 10);
      if (count > 0) {
        console.log("Seeding already applied, skipping seeding process.");
        return;
      }
    }

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

      console.log("Seeding page categories...");
      await pageCategoriesSeed.up(queryInterface);

      console.log("Seeding content...");
      await contentSeed.up(queryInterface);

      console.log("Seeding comments...");
      await commentsSeed.up(queryInterface);

      console.log("Seeding comment reactions...");
      await commentReactionsSeed.up(queryInterface);

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