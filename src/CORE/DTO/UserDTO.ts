import { Schema } from 'mongoose';
export class UserDTO {
    _id?: Schema.Types.ObjectId;
    Email?: string;
    Name?: string;
    LastName?: string;
    Phone?: string;
}