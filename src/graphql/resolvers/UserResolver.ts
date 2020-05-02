import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import bcrypt from 'bcrypt'
import User from '../../models/User'

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi'
  }
  @Mutation(() => Boolean)
  async signUpUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, '10')
    await User.create({ email, password: hashedPassword })
    return true
  }
}
