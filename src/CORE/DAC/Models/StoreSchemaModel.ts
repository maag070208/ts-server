import { Schema } from 'mongoose';
export interface StoreSchemaModel {
    // UUID
    _id: Schema.Types.ObjectId;
    // STORE INFO
    Name: string;
    Icon: string;
    Logo: string;
    User: Schema.Types.ObjectId,
    // STORE LOCATION
    Latitude: string;
    Longitude: string;
    //STORE ADMINISTRATION
    IsActive: Boolean;
    __v:number;
}