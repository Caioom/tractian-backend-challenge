"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor(companyName, user) {
        this.companyName = companyName;
        this.users = [user];
        this.units = [];
    }
}
exports.Company = Company;
