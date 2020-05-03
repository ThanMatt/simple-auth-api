import { Resolver, Mutation, Arg, Query, InputType, Field } from 'type-graphql'
import { User, UserModel } from '../../models/User'
import bcrypt from 'bcryptjs'
import axios from 'axios'

@InputType()
class SignupInput {
  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}
@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi'
  }

  @Mutation(() => Boolean)
  async signUpUser(
    @Arg('SignupInput', () => SignupInput) { email, password }: SignupInput
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      await UserModel.create({ email, password: hashedPassword })
      await axios.post('http://mailer:5000/auth/confirmation', { email })
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Mutation(() => User)
  async loginUser(
    @Arg('LoginInput', () => LoginInput) { email, password }: LoginInput
  ) {
    try {
      const user = await UserModel.findOne({ email })

      if (user) {
        const comparePassword = await bcrypt.compare(password, user.password)

        if (comparePassword) {
          console.log(email)
          await axios.post('http://mailer:5000/auth/login-request', { email })
          return user
        }

        return false
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
