import mongoose, { Schema } from 'mongoose';
import { StoreSchemaModel } from '../Models/StoreSchemaModel';

const StoreSchema: Schema<StoreSchemaModel> = new Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        Name: { type: String, required: true },
        Icon: {type:String},
        Logo: {type:String},
        User: {type:Schema.Types.ObjectId, required: true},
        Latitude : {type:String, required: true},
        Longitude: {type:String, required: true},
        IsActive: { type: Boolean },
    }
);

export default mongoose.model<StoreSchemaModel>('Stores', StoreSchema);