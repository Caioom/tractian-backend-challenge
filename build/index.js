"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
(0, module_alias_1.addAlias)('@', (0, path_1.resolve)('build'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('Server started 3000');
});
