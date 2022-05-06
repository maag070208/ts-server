import { Router } from 'express';
import usersService from '../../CORE/SRV/UsersService';



class UsersController {
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config():void{
		this.router.get('/', usersService.addUser);
	}
}

const usersController = new UsersController();
export default usersController.router;