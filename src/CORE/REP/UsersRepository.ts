import mongoose from 'mongoose';
import UsersSchema from '../DAC/SCHEMA/UsersSchema'
import { UserDTO } from '../DTO/UserDTO';

const addUser = ():UserDTO => {
    try{
        const newUser = new UsersSchema({
            _id:  new mongoose.Types.ObjectId(),
            name:"martin asael amaro garcia"
        });
         newUser.save()
        return newUser;
    }catch(err){
        const newUser:UserDTO = {_id:"", name:""}
        return newUser
    }
};
export default { addUser };