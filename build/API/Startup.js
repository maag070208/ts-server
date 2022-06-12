"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_context_1 = require("../CORE/DAC/database.context");
const IndexController_1 = __importDefault(require("./controllers/IndexController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const StoreController_1 = __importDefault(require("./controllers/StoreController"));
const dotenv = require('dotenv');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        dotenv.config();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', IndexController_1.default);
        this.app.use('/users', UsersController_1.default);
        this.app.use('/auth', AuthController_1.default);
        this.app.use('/stores', StoreController_1.default);
    }
    start() {
        database_context_1.connectionDB.connectToMongodb();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=Startup.js.map