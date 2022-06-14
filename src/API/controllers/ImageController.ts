import { Router } from 'express';
import ImageService from '../../CORE/SRV/ImageService';

class ImageController {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.post('/', ImageService.saveImage);
	}
}

const imageController = new ImageController();
export default imageController.router;