import mongoose, { Schema } from 'mongoose';
import { UserSchemaModel } from '../Models/UserSchemaModel';

const UsersSchema: Schema<UserSchemaModel> = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        Email: { type: String, required: true, unique: true },
        Name: { type: String, required: true },
        PaternalLastName: { type: String, required: true },
        MaternalLastName: { type: String },
        Latitude : {type:String, required: true},
        Longitude: {type:String, required: true},
        Phone: { type: String, required: true },
        Password: { type: String, required: true }, 
        IsActive: { type: Boolean },
    }
);

export default mongoose.model<UserSchemaModel>('Users', UsersSchema);