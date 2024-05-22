"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Config object to store configuration settings
const Config = {
    databaseUrl: process.env.DATABASE_URL // Assigning the DATABASE_URL environment variable to the databaseUrl property
};
exports.default = Config;
