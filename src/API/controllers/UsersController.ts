import { Router } from 'express';
import userService from '../../CORE/SRV/UsersService';

class UsersController {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.get('/', userService.getUsers);
		this.router.get('/:id', userService.getUserById);
		this.router.post('/', userService.addUser);
	}
}

const usersController = new UsersController();
export default usersController.router;