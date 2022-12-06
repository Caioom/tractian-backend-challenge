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
exports.CreateCompanyController = void 0;
const models_1 = require("@/domain/models");
class CreateCompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    handler(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (httpRequest.company_name === '' || httpRequest.company_name === null || httpRequest.company_name === undefined) {
                return { statusCode: '400', message: 'Insert a valid name for your company' };
            }
            const company = new models_1.Company(httpRequest.company_name, httpRequest.user);
            this.companyService.create({ company });
            return { statusCode: '200', message: 'ok' };
        });
    }
}
exports.CreateCompanyController = CreateCompanyController;
