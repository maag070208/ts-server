import { Schema } from 'mongoose';
import { UserDTO } from './UserDTO';
export class StoreDTO {
    _id: Schema.Types.ObjectId;
    Name: string;
    Icon:string;
    Logo:string;
    User:UserDTO;
    Latitude: string;
    Longitude: string;
}