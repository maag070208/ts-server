import { Request, Response } from 'express';
declare class UserService {
    addUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const userService: UserService;
export default userService;
