import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import userService from '../../CORE/SRV/UsersService';
import { UserDTO } from '../DTO/UserDTO';

const generateToken = (user:UserDTO): Promise<string> => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        Time: Date(),
        _id: user._id,
        Email: user.Email,
        Name: user.Name,
        LastName: user.LastName,
        Phone: user.Phone,
        Password: user.Password,
        IsActive: user.IsActive
    }
    let token =  jwt.sign(data, jwtSecretKey);
    return token;
}

class AuthService {
    public async login(req: Request, res: Response) {
        try {
            let user = await userService.getUserLogin(req);
            if (!user.Success) return res.status(400).json(user);
            console.log(user.Result);
            
            let token = generateToken(user.Result);
            console.log(token);
            
            return res.status(200).json({token:  token});
          } catch (error) {
            console.log(error);
          }
    }
}
const authService = new AuthService();
export default authService;