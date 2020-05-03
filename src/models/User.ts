import mongoose, { Schema, Document } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

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

@ObjectType()
export class User {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}

export const UserModel = mongoose.model<IUser>('User', UserSchema)
