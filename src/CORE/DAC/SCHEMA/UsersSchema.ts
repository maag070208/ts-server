import mongoose, { Document, Schema } from 'mongoose';
import { UserDTO } from '../../DTO/UserDTO';

export interface IUsersModel extends UserDTO, Document {}

const UsersSchema: Schema = new Schema(
    {
        _id:{ type: Schema.Types.ObjectId},
        name: { type: String, required: true }
    }
);

export default mongoose.model<IUsersModel>('Users', UsersSchema);