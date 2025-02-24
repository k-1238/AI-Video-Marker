import mongoose, { Document, Model, Schema } from 'mongoose';
import validator from 'validator';
/*************  ✨ Codeium Command 🌟  *************/
interface IUser extends Document {
  email: string;
  password: string;
  role: string[];
  priceName?: mongoose.Types.ObjectId;
  phoneNumber?: string;
  userName?: string;
  picture?: string
}


const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    default: ['Admin'],
    required: true,
  },
  priceName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DescPrice',
  },
  phoneNumber: {
    type: String,
  },
  userName: {
    type: String,
  },
  picture: String,

});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export { UserModel };
