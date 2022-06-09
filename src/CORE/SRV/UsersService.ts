import { Request, Response } from 'express';
import { LoginBindingModel } from '../DTO/BindingModels/AuthBindingModel';
import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import userRepository from "../REP/UsersRepository";
import { TResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
const bcrypt = require("bcrypt");

class UserService {
    public async addUser(req: Request, res: Response) {
        const hash = await bcrypt.hash(req.body.Password, 10);
        const user: UserBindingModel = Object.assign(new UserBindingModel(), {
            Email: req.body.Email,
            Name: req.body.Name,
            LastName: req.body.LastName,
            Phone: req.body.Phone,
            Password: hash
        })
        const result = await userRepository.addUser(user);
        return res.json(result);
    }

    public async getUsers(req: Request, res: Response) {
        const result = await userRepository.getUsers();
        return res.json(result);
    }

    public async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await userRepository.getUserById(id);
        return res.json(result);
    }

    public async getUserLogin(req: Request):Promise<TResult<UserDTO>> {
        const user: LoginBindingModel = Object.assign(new LoginBindingModel(), {
            Email: req.body.Email,
            Password: req.body.Password
        })
        return await userRepository.getUserLogin(user);
    }

}
const userService = new UserService();
export default userService;