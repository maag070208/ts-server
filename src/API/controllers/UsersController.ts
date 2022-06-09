import { Router } from 'express';
import userService from '../../CORE/SRV/UsersService';
import auth from "../../CORE/COM/middleware/auth";

class UsersController {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', auth, userService.getUsers);
		this.router.get('/:id',auth, userService.getUserById);
		this.router.post('/', userService.addUser);
	}
}

const usersController = new UsersController();
export default usersController.router;