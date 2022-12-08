"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
(0, module_alias_1.addAlias)('@', (0, path_1.resolve)('build'));
dotenv_1.default.config();
const mongoConnectionString = process.env.DATABASE_URL;
mongoose_1.default.connect('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/test');
const database = mongoose_1.default.connection;
database.on('error', (err) => {
    console.log(err);
});
database.on('connected', () => {
    console.log('connected to mongodb');
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('Server started 3000');
});
