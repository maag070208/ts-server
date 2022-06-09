import { Request, Response } from 'express';
import { UserBindingModel } from '../DTO/BindingModels/UsersBindingModel';
import userRepository from "../REP/UsersRepository";

class UserService {
    public async addUser(req: Request, res: Response) {
        const user: UserBindingModel = Object.assign(new UserBindingModel(), {
            Email: req.body.Email,
            Name: req.body.Name,
            LastName: req.body.LastName,
            Phone: req.body.Phone,
            Password: req.body.Password
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
}
const userService = new UserService();
export default userService;