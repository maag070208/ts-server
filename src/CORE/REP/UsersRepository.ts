import mongoose, { Document } from 'mongoose';
import UsersSchema from '../DAC/SCHEMA/UsersSchema'
import { LoginBindingModel } from '../DTO/BindingModels/AuthBindingModel';
import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
const bcrypt = require("bcrypt");
import AutoMapper from "ts-automapper";
import { UserSchemaModel } from '../DAC/Models/UserSchemaModel';

class UserRepository {
    public tResult = new TResult();

    constructor() {
        this.setMaps();
    }

    public async addUser(user: UserBindingModel): Promise<TResult<UserDTO>> {
        try {
            const User = await UsersSchema.findOne({ Email: user.Email });
            if (User) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`El usuario: '${user.Email}' ya existe`]);
            const newUser = new UsersSchema({
                _id: new mongoose.Types.ObjectId(),
                Email: user.Email,
                Name: user.Name,
                LastName: user.LastName,
                Phone: user.Phone,
                Password: user.Password,
                IsActive: true,
            });
            await newUser.save();
            return this.tResult.CreateTResult<UserDTO>(AutoMapper.exec("EDITUSER", newUser), []);
        } catch (err) {
            console.log(err);
            const newUser: UserDTO = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(newUser, ["No pudo crear el usuario"]);
        }
    }

    public async getUsers(): Promise<TResult<UserDTO[]>> {
        try {
            const users = new Array<UserDTO>();
            const Users = await UsersSchema.find();
            if (Users.length == 0) return this.tResult.CreateTResult<UserDTO[]>(Users, ["No encontro ningun usuario"]);
            for (var i = 0; i < Users.length; i++){
                users.push(AutoMapper.exec("EDITUSER", Users[i]))
            }
            return this.tResult.CreateTResult<UserDTO[]>(users, []);
        } catch (err) {
            const Users = new Array<UserDTO>();
            return this.tResult.CreateTResult<UserDTO[]>(Users, ["No encontro ningun usuario"]);
        }
    }

    public async getUserById(id: string): Promise<TResult<UserDTO>> {
        try {
            const User = await UsersSchema.findOne({ _id: id, IsActive: true });
            if (!User) return this.tResult.CreateTResult<UserDTO>(User, ["No encontro al usuario"]);
            return this.tResult.CreateTResult<UserDTO>(AutoMapper.exec("EDITUSER", User), []);
        } catch (err) {
            const User = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(User, ["No encontro al usuario"]);

        }
    }

    private async comparePassword(password: string, userPassword: string): Promise<Boolean> {
        const cmp = await bcrypt.compare(password, userPassword);
        return !cmp;
    }

    public async getUserLogin(user: LoginBindingModel): Promise<TResult<UserDTO>> {
        try {
            const User = await UsersSchema.findOne({ Email: user.Email, IsActive: true });
            if (!User) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`El usuario: ${user.Email} no existe`]);
            if (await this.comparePassword(user.Password, User.Password)) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`La contraseña: '${user.Password}' no coincide`]);
            return this.tResult.CreateTResult<UserDTO>(AutoMapper.exec("EDITUSER", User), []);
        } catch (err) {
            const User = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(User, ["Ah ocurrido un erros inesperado"]);
        }
    }

    private setMaps() {
        AutoMapper.create<UserDTO, UserSchemaModel>("EDITUSER")
            .map(
                (src) => src._id,
                (dst) => dst._id
            )
            .map(
                (src) => src.Name,
                (dst) => dst.Name
            )
            .map(
                (src) => src.LastName,
                (dst) => dst.LastName,
            )
            .map(
                (src) => src.Email,
                (dst) => dst.Email
            )
            .map(
                (src) => src.Phone,
                (dst) => dst.Phone
            );
    }
}
const userRepository = new UserRepository();
export default userRepository;
