import dotenv from 'dotenv';
dotenv.config();

// Import and initialize models and associations
import "../src/models";

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../src/models/index.js"; // Import the Sequelize instance from models/index.ts

import * as usersSeed from "../sequelize_seeds/usersSeed.js";
import * as reactionsSeed from "../sequelize_seeds/reactionsSeed.js";
import * as categoriesSeed from "../sequelize_seeds/categoriesSeed.js";
import * as pagesSeed from "../sequelize_seeds/pagesSeed.js";
import * as contentSeed from "../sequelize_seeds/contentSeed.js";
import * as commentsSeed from "../sequelize_seeds/commentsSeed.js";

const adminSequelize = new Sequelize(
    'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

(async () => {
    try {
        // Verify database exists
        const dbName = process.env.DB_NAME || "hyrule_db";
        const [results] = await adminSequelize.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);

        if (!results.length) {
            console.log(`Database ${dbName} does not exist. Creating...`);
            await adminSequelize.query(`CREATE DATABASE "${dbName}"`); 
        } else {
            console.log(`Database ${dbName} exists.`);
        }

        // Authenticate connection to target database
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Sync all models
        await sequelize.sync({ alter: true }); // Sync models with the database
        console.log("All models synced with the database.");

        // Get QueryInterface
        const queryInterface = sequelize.getQueryInterface();

        // Execute seed functions
        await usersSeed.up(queryInterface);
        await reactionsSeed.up(queryInterface);
        await categoriesSeed.up(queryInterface);
        await pagesSeed.up(queryInterface);
        await contentSeed.up(queryInterface);
        await commentsSeed.up(queryInterface);

        console.log("Database has been seeded successfully.");

    } catch (err) {
        console.error("Error during database setup:", err);
    } finally {
        // Close admin connection
        await adminSequelize.close();
    }
})();

export { sequelize };
export default sequelize;
