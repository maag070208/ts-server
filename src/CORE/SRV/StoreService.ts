import { Request, Response } from 'express';
import { StoreBindingModel } from '../DTO/BindingModels/StoreBindingModel';
import storeRepository from '../REP/StoreRepository';

class StoreService {
    public async addStore(req: Request, res: Response) {
        const store: StoreBindingModel = {
            Name: req.body.Name,
            Icon: req.body.Icon,
            Logo: req.body.Logo,
            IdUser:  req.body.IdUser,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
        }
        const result = await storeRepository.addStore(store);
        return res.json(result);
    }

    public async getAllStores(req: Request, res: Response){
        const result = await storeRepository.getAllStores();
        return res.json(result);
    }

    public async getStoreById(req: Request, res: Response){
        const {id} = req.params;
        const result = await storeRepository.getStoreById(id);
        return res.json(result);
    }
}
const storeService = new StoreService();
export default storeService;