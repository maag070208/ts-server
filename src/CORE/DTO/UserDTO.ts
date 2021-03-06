import { Schema } from 'mongoose';
export class UserDTO {
    _id: Schema.Types.ObjectId;
    Email: string;
    Name: string;
    PaternalLastName: string;
    MaternalLastName: string;
    Phone: string;
    Latitude: string;
    Longitude: string;
}