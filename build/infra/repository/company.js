"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyRepoMongoDb = void 0;
class CreateCompanyRepoMongoDb {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    create(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.mongoClient.db('tractian-challenge').collection('companies').insertOne(company);
            if (result) {
                return result.insertedId.toString();
            }
            return undefined;
        });
    }
}
exports.CreateCompanyRepoMongoDb = CreateCompanyRepoMongoDb;
