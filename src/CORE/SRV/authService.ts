import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import userService from '../../CORE/SRV/UsersService';
import { UserDTO } from '../DTO/UserDTO';
import { TResult } from '../DTO/TResult/TResult';

const generateToken = (user:UserDTO): string => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        Time: Date(),
        _id: user._id,
        Email: user.Email,
        Name: user.Name,
        LastName: user.LastName,
        Phone: user.Phone,
    }
    let token =  jwt.sign(data, jwtSecretKey);
    return token;
}

class AuthService {

    public async login(req: Request, res: Response) {
        let tResult = new TResult();

        try {
            let user = await userService.getUserLogin(req);
            if (!user.Success) return res.status(400).json(user);
            let token = generateToken(user.Result);

            let ress = tResult.CreateTResult<string>(token, []);
            console.log(ress);
            
            return res.status(200).json(ress);
          } catch (error) {
            console.log(error);
          }
    }
}
const authService = new AuthService();
export default authService;