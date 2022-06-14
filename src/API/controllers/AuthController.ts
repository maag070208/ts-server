import { Router } from 'express';
import AuthService from '../../CORE/SRV/AuthService';

class AuthController {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.post('/', AuthService.login);
	}
}

const authController = new AuthController();
export default authController.router;