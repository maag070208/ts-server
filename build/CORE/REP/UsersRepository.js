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
const ts_automapper_1 = __importDefault(require("ts-automapper"));
class UserRepository {
    constructor() {
        this.tResult = new TResult_1.TResult();
        this.setMaps();
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
                    PaternalLastName: user.PaternalLastName,
                    MaternalLastName: user.MaternalLastName,
                    Phone: user.Phone,
                    Latitude: user.Latitude,
                    Longitude: user.Longitude,
                    Password: user.Password,
                    IsActive: true,
                });
                yield newUser.save();
                return this.tResult.CreateTResult(ts_automapper_1.default.exec("EDITUSER", newUser), []);
            }
            catch (err) {
                console.log(err);
                const newUser = new UserDTO_1.UserDTO();
                return this.tResult.CreateTResult(newUser, ["No pudo crear el usuario"]);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = new Array();
                const Users = yield UsersSchema_1.default.find();
                if (Users.length == 0)
                    return this.tResult.CreateTResult(Users, ["No encontro ningun usuario"]);
                for (var i = 0; i < Users.length; i++) {
                    users.push(ts_automapper_1.default.exec("EDITUSER", Users[i]));
                }
                return this.tResult.CreateTResult(users, []);
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
                const User = yield UsersSchema_1.default.findOne({ _id: id, IsActive: true });
                if (!User)
                    return this.tResult.CreateTResult(User, ["No encontro al usuario"]);
                return this.tResult.CreateTResult(ts_automapper_1.default.exec("EDITUSER", User), []);
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
                return this.tResult.CreateTResult(ts_automapper_1.default.exec("EDITUSER", User), []);
            }
            catch (err) {
                const User = new UserDTO_1.UserDTO();
                return this.tResult.CreateTResult(User, ["Ah ocurrido un erros inesperado"]);
            }
        });
    }
    setMaps() {
        ts_automapper_1.default.create("EDITUSER")
            .map((src) => src._id, (dst) => dst._id)
            .map((src) => src.Name, (dst) => dst.Name)
            .map((src) => src.PaternalLastName, (dst) => dst.PaternalLastName)
            .map((src) => src.MaternalLastName, (dst) => dst.MaternalLastName)
            .map((src) => src.Latitude, (dst) => dst.Latitude)
            .map((src) => src.Longitude, (dst) => dst.Longitude)
            .map((src) => src.Email, (dst) => dst.Email)
            .map((src) => src.Phone, (dst) => dst.Phone);
    }
}
const userRepository = new UserRepository();
exports.default = userRepository;
//# sourceMappingURL=UsersRepository.js.map