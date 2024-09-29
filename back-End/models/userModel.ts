import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    hashedPassword: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);
export default User;
