import mongoose from 'mongoose';
import UsersSchema from '../DAC/SCHEMA/UsersSchema'
import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';


class UserRepository {
    public tResult = new TResult();

    public async addUser(user: UserBindingModel): Promise<TResult<UserDTO>> {
        try {
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
}
const userRepository = new UserRepository();
export default userRepository;
