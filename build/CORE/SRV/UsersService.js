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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersBindingModel_1 = require("../DTO/BindingModels/UsersBindingModel");
const UsersRepository_1 = __importDefault(require("../REP/UsersRepository"));
class UserService {
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(new UsersBindingModel_1.UserBindingModel(), {
                Email: req.body.Email,
                Name: req.body.Name,
                LastName: req.body.LastName,
                Phone: req.body.Phone,
                Password: req.body.Password
            });
            const result = yield UsersRepository_1.default.addUser(user);
            return res.json(result);
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield UsersRepository_1.default.getUsers();
            return res.json(result);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield UsersRepository_1.default.getUserById(id);
            return res.json(result);
        });
    }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=UsersService.js.map