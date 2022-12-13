"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
(0, module_alias_1.addAlias)('@', (0, path_1.resolve)('build'));
const repository_1 = require("@/infra/repository");
const models_1 = require("@/domain/models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    const mongoClient = new mongodb_1.MongoClient('mongodb+srv://tractian-user:12345@tractian-backend-test.1r7yw2r.mongodb.net/test');
    const companyRepo = new repository_1.CreateCompanyRepoMongoDb(mongoClient);
    companyRepo.create(new models_1.Company('test_company', new models_1.User('caio')));
    console.log('Server started 3000');
});
