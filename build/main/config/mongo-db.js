"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabaseConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabaseConfig {
    constructor() {
        mongoose_1.default.connect('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/test');
        const database = mongoose_1.default.connection;
        database.on('error', (error) => {
            console.log(`Error connecting to MongoDb ${error}`);
        });
        database.on('connected', () => {
            console.log('Connected to MongoDb');
            this.connection = database;
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.MongoDatabaseConfig = MongoDatabaseConfig;
