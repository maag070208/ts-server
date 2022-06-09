import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
declare class UserRepository {
    tResult: TResult<unknown>;
    addUser(user: UserBindingModel): Promise<TResult<UserDTO>>;
    getUsers(): Promise<TResult<UserDTO[]>>;
    getUserById(id: string): Promise<TResult<UserDTO>>;
}
declare const userRepository: UserRepository;
export default userRepository;
