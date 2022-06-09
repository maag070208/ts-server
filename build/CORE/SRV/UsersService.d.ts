import { Request, Response } from 'express';
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
declare class UserService {
    addUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserLogin(req: Request): Promise<TResult<UserDTO>>;
}
declare const userService: UserService;
export default userService;
