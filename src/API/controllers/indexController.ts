import { Router } from 'express';
import { Request, Response } from 'express';

class IndexController {
	public router: Router = Router();
	constructor(){
		this.config();
	}
    async helloWorld(req: Request, res: Response){
        return res.json({helloWorld:"helloWorld"});
    }

	config():void{
		this.router.get('/', this.helloWorld);
	}
}

const indexController = new IndexController();
export default indexController.router;