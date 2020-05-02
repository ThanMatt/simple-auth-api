import express from 'express'
import mongoose from 'mongoose'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './graphql/resolvers/UserResolver'
;(async () => {
  try {
    const app = express()

    app.use(express.urlencoded({ extended: false }))

    mongoose.connect(process.env.MONGO_URL || 'mongodb://db:27017/simple', {
      useNewUrlParser: true,
      useFindAndModify: false,
      reconnectTries: 30,
      reconnectInterval: 500
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB connection: success')
    })

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver]
      }),
      context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(4000, () => {
      console.log('Express server started')
    })
  } catch (error) {
    console.log(error)
  }
})()
