import mongoose from 'mongoose';
import { TResult } from '../DTO/TResult/TResult';
import AutoMapper from "ts-automapper";
import { StoreDTO } from '../DTO/StoreDTO';
import { StoreSchemaModel } from '../DAC/Models/StoreSchemaModel';
import StoreSchema from '../DAC/SCHEMA/StoreSchema';
import { StoreBindingModel } from '../DTO/BindingModels/StoreBindingModel';
import { UserDTO } from '../DTO/UserDTO';
import { UserSchemaModel } from '../DAC/Models/UserSchemaModel';
import UsersSchema from '../DAC/SCHEMA/UsersSchema';

class StoreRepository {
    public tResult = new TResult();

    constructor() {
        this.setMaps();
    }

    public async addStore(store: StoreBindingModel): Promise<TResult<StoreDTO>> {
        try {
            const newStore = new StoreSchema({
                _id: new mongoose.Types.ObjectId(),
                Name: store.Name,
                Icon: store.Icon,
                Logo: store.Logo,
                User: store.IdUser,
                Latitude: store.Latitude,
                Longitude: store.Longitude,
                IsActive: true
            });
            await newStore.save();
            return this.tResult.CreateTResult<StoreDTO>(AutoMapper.exec("EDITSTORE", newStore), []);
        } catch (err) {
            console.log(err);
            return this.tResult.CreateTResult<StoreDTO>(new StoreDTO(), ["No pudo crear el servicio"]);
        }
    }

    public async getAllStores(): Promise<TResult<StoreDTO[]>> {
        try {
            const Stores = await StoreSchema.find({ IsActive: true });
            const stores = new Array<StoreDTO>();
            if (Stores.length == 0) return this.tResult.CreateTResult<StoreDTO[]>(new Array<StoreDTO>(), ["No se econtraron servicios activos"]);
            for (var i = 0; i < Stores.length; i++) {
                let s: StoreDTO = AutoMapper.exec("EDITSTORE", Stores[i]);
                let user = await UsersSchema.findById(Stores[i].User)
                s.User = AutoMapper.exec("EDITUSER", user);
                stores.push(s);
            }
            return this.tResult.CreateTResult<StoreDTO[]>(stores, []);
        } catch (err) {
            return this.tResult.CreateTResult<StoreDTO[]>(new Array<StoreDTO>(), ["No se econtraron servicios activos"]);
        }
    }


public async getStoreById(id:string): Promise<TResult<StoreDTO>> {
        try {
            const Store = await StoreSchema.findOne({_id:id, IsActive: true });
            if (!Store) return this.tResult.CreateTResult<StoreDTO>(new StoreDTO(), ["No se econtraron servicios activos"]);
            let store: StoreDTO = AutoMapper.exec("EDITSTORE", Store);
            let user = await UsersSchema.findById(Store.User)
            store.User = AutoMapper.exec("EDITUSER", user);
            return this.tResult.CreateTResult<StoreDTO>(store, []);
        } catch (err) {
            return this.tResult.CreateTResult<StoreDTO>(new StoreDTO(), ["No se econtraron servicios activos"]);
        }
    }

    private setMaps() {
        AutoMapper.create<StoreDTO, StoreSchemaModel>("EDITSTORE")
            .map((src) => src._id, (dst) => dst._id)
            .map((src) => src.Name, (dst) => dst.Name)
            .map((src) => src.Logo, (dst) => dst.Logo,)
            .map((src) => src.Icon, (dst) => dst.Icon)
            .map((src) => src.Latitude, (dst) => dst.Latitude,)
            .map((src) => src.Longitude, (dst) => dst.Longitude);
        AutoMapper.create<UserDTO, UserSchemaModel>("EDITUSER")
            .map((src) => src._id, (dst) => dst._id)
            .map((src) => src.Name, (dst) => dst.Name)
            .map((src) => src.PaternalLastName, (dst) => dst.PaternalLastName,)
            .map((src) => src.MaternalLastName, (dst) => dst.MaternalLastName,)
            .map((src) => src.Latitude, (dst) => dst.Latitude,)
            .map((src) => src.Longitude, (dst) => dst.Longitude,)
            .map((src) => src.Email, (dst) => dst.Email)
            .map((src) => src.Phone, (dst) => dst.Phone);
    }
}
const storeRepository = new StoreRepository();
export default storeRepository;
