import { Router } from 'express';
import authService from '../../CORE/SRV/authService';

class AuthController {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.post('/', authService.login);
	}
}

const authController = new AuthController();
export default authController.router;