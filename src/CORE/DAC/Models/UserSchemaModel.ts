import { Schema } from 'mongoose';
export class UserSchemaModel {
    _id?: Schema.Types.ObjectId;
    Email?: string;
    Name?: string;
    LastName?: string;
    Phone?: string;
    Password?: string;
    IsActive?: Boolean;
    __v?:number;
}