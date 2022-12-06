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
exports.CompanyCreationService = void 0;
const error_1 = require("@/data/error");
class CompanyCreationService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    create({ company }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCompany = yield this.companyRepository.findCompanyByName(company.companyName);
            if (existingCompany) {
                throw new error_1.CompanyCreationError('This company name is already in use');
            }
            this.companyRepository.create(company);
        });
    }
}
exports.CompanyCreationService = CompanyCreationService;
