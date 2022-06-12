import { Schema } from 'mongoose';
export interface UserSchemaModel {
    // UUID
    _id: Schema.Types.ObjectId;
    // USER INFO
    Email: string;
    Name: string;
    PaternalLastName: string;
    MaternalLastName: string;
    Phone: string;
    // PASSWORD IS ENCRYPTED
    Password: string;
    // USER LOCATION
    Latitude: string;
    Longitude: string;
    // USER ADMINISTRATION
    IsActive: Boolean;
    __v:number;
}