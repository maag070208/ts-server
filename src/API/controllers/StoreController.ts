import { Router } from 'express';
import auth from "../../CORE/COM/middleware/auth";
import storeService from '../../CORE/SRV/StoreService';

class StoreController {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', auth, storeService.getAllStores);
		this.router.get('/:id', auth, storeService.getStoreById);
		this.router.post('/', auth, storeService.addStore);
	}
}

const storeController = new StoreController();
export default storeController.router;