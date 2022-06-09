import mongoose from 'mongoose';
import UsersSchema from '../DAC/SCHEMA/UsersSchema'
import { LoginBindingModel } from '../DTO/BindingModels/AuthBindingModel';
import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
const bcrypt = require("bcrypt");


class UserRepository {
    public tResult = new TResult();
    public async addUser(user: UserBindingModel): Promise<TResult<UserDTO>> {
        try {
            const User = await UsersSchema.findOne({ Email: user.Email});
            if(User) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`El usuario: '${user.Email}' ya existe`]);
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
            return this.tResult.CreateTResult<UserDTO>(newUser, []);
        } catch (err) {
            const newUser: UserDTO = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(newUser, ["No pudo crear el usuario"]);
        }
    }
    public async getUsers():Promise<TResult<UserDTO[]>>{
        try {
            const Users = await UsersSchema.find();
            if(Users.length == 0) return this.tResult.CreateTResult<UserDTO[]>(Users, ["No encontro ningun usuario"]);
            return this.tResult.CreateTResult<UserDTO[]>(Users, []);
        } catch (err) {
            const Users = new Array<UserDTO>();
            return this.tResult.CreateTResult<UserDTO[]>(Users, ["No encontro ningun usuario"]);
        }
    }
    public async getUserById(id: string):Promise<TResult<UserDTO>>{
        try {
            const User = await UsersSchema.find({ _id: id, IsActive: true });
            if(User.length == 0) return this.tResult.CreateTResult<UserDTO>(User[0], ["No encontro al usuario"]);
            return this.tResult.CreateTResult<UserDTO>(User[0], []);
        } catch (err) {
            const User = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(User, ["No encontro al usuario"]);
    
        }
    }
    private async comparePassword(password: string, userPassword:string):Promise<Boolean>{
        const cmp = await bcrypt.compare(password, userPassword);
        return !cmp;
    }
    public async getUserLogin(user: LoginBindingModel): Promise<TResult<UserDTO>> {
        try {
            const User = await UsersSchema.findOne({ Email: user.Email, IsActive: true });
            if(!User) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`El usuario: ${user.Email} no existe`]);
            if( await this.comparePassword(user.Password, User.Password)) return this.tResult.CreateTResult<UserDTO>(new UserDTO(), [`La contraseña: '${user.Password}' no coincide`]);
            return this.tResult.CreateTResult<UserDTO>(User, []);
        } catch (err) {
            const User = new UserDTO();
            return this.tResult.CreateTResult<UserDTO>(User, ["Ah ocurrido un erros inesperado"]);
        }
    }
    
}
const userRepository = new UserRepository();
export default userRepository;
