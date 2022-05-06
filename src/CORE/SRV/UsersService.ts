import { Request, Response } from 'express';
import { tResult } from '../DTO/TResult/TResult';
import { UserDTO } from '../DTO/UserDTO';
import usersRepository from "../REP/UsersRepository";

const addUser = (req: Request, res: Response) => {
    const result = usersRepository.addUser();

    if (result._id != "") {
        return res.json(tResult.CreateTResult<UserDTO>(result));
    }

    return res.json(tResult.CreateTResult<UserDTO>({},["no se pudo crear el usuario"]));

}
export default { addUser };
