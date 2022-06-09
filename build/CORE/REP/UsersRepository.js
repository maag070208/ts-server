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
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema_1 = __importDefault(require("../DAC/SCHEMA/UsersSchema"));
const TResult_1 = require("../DTO/TResult/TResult");
const UserDTO_1 = require("../DTO/UserDTO");
const bcrypt = require("bcrypt");
class UserRepository {
    constructor() {
        this.tResult = new TResult_1.TResult();
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UsersSchema_1.default.findOne({ Email: user.Email });
                if (User)
                    return this.tResult.CreateTResult(new UserDTO_1.UserDTO(), [`El usuario: '${user.Email}' ya existe`]);
                const newUser = new UsersSchema_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    Email: user.Email,
                    Name: user.Name,
                    LastName: user.LastName,
                    Phone: user.Phone,
                    Password: user.Password,
                    IsActive: true,
                });
                yield newUser.save();
                return this.tResult.CreateTResult(newUser, []);
            }
            catch (err) {
                const newUser = new UserDTO_1.UserDTO();
                return this.tResult.CreateTResult(newUser, ["No pudo crear el usuario"]);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Users = yield UsersSchema_1.default.find();
                if (Users.length == 0)
                    return this.tResult.CreateTResult(Users, ["No encontro ningun usuario"]);
                return this.tResult.CreateTResult(Users, []);
            }
            catch (err) {
                const Users = new Array();
                return this.tResult.CreateTResult(Users, ["No encontro ningun usuario"]);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UsersSchema_1.default.find({ _id: id, IsActive: true });
                if (User.length == 0)
                    return this.tResult.CreateTResult(User[0], ["No encontro al usuario"]);
                return this.tResult.CreateTResult(User[0], []);
            }
            catch (err) {
                const User = new UserDTO_1.UserDTO();
                return this.tResult.CreateTResult(User, ["No encontro al usuario"]);
            }
        });
    }
    comparePassword(password, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmp = yield bcrypt.compare(password, userPassword);
            return !cmp;
        });
    }
    getUserLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UsersSchema_1.default.findOne({ Email: user.Email, IsActive: true });
                if (!User)
                    return this.tResult.CreateTResult(new UserDTO_1.UserDTO(), [`El usuario: ${user.Email} no existe`]);
                if (yield this.comparePassword(user.Password, User.Password))
                    return this.tResult.CreateTResult(new UserDTO_1.UserDTO(), [`La contraseña: '${user.Password}' no coincide`]);
                return this.tResult.CreateTResult(User, []);
            }
            catch (err) {
                const User = new UserDTO_1.UserDTO();
                return this.tResult.CreateTResult(User, ["Ah ocurrido un erros inesperado"]);
            }
        });
    }
}
const userRepository = new UserRepository();
exports.default = userRepository;
//# sourceMappingURL=UsersRepository.js.map