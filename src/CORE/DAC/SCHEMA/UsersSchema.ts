import mongoose, { Document, Schema } from 'mongoose';
import { UserDTO } from '../../DTO/UserDTO';

const UsersSchema: Schema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        Email: { type: String, required: true, unique: true },
        Name: { type: String, required: true },
        LastName: { type: String, required: true },
        Phone: { type: String, required: true },
        Password: { type: String, required: true },
        IsActive: { type: Boolean }
    }
);

export default mongoose.model<UserDTO>('Users', UsersSchema);