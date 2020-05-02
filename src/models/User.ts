import mongoose, { Schema } from 'mongoose'

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

export default mongoose.model('User', UserSchema)
