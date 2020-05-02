import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
})

export default mongoose.model<IUser>('User', UserSchema)
