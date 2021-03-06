"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersService_1 = __importDefault(require("../../CORE/SRV/UsersService"));
const auth_1 = __importDefault(require("../../CORE/COM/middleware/auth"));
class UsersController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.default, UsersService_1.default.getUsers);
        this.router.get('/:id', auth_1.default, UsersService_1.default.getUserById);
        this.router.post('/', UsersService_1.default.addUser);
    }
}
const usersController = new UsersController();
exports.default = usersController.router;
//# sourceMappingURL=UsersController.js.map