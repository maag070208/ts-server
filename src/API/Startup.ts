
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectionDB } from "../CORE/DAC/database.context";
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';
import StoreController from './controllers/StoreController';
import IndexController from './controllers/IndexController';
import ImageController from './controllers/ImageController';
const dotenv = require('dotenv');
  
class Server {

	public app: Application;

	constructor() {
		this.app = express();
		dotenv.config();
		this.config();
		this.routes();
	}

	config(): void {
		this.app.set('port', 3000);
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json({limit: '50mb'}));
		this.app.use(express.urlencoded({limit: '50mb', extended: true}));
	}

	routes(): void {
		this.app.use('/', IndexController);
		this.app.use('/users', UsersController);
		this.app.use('/auth', AuthController);
		this.app.use('/stores', StoreController);
		this.app.use('/images', ImageController);
	}

	start(): void {
		connectionDB.connectToMongodb();
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port', this.app.get('port'));
		});
	}
}

const server = new Server();
server.start();