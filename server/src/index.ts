import 'reflect-metadata'
import { connect } from 'mongoose'
import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { mergeResolvers, mergeTypeDefs, mergeSchemas } from 'graphql-toolkit'
import UserResolver from './modules/user/UserResolver'
import { authChecker } from './modules/user/authChecker'
import { setUpAccounts } from './modules/user/accounts'
import { TypegooseMiddleware } from './middleware/typegoose'
;(async () => {
  const mongooseConnection = await connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ops-master-web",
    { useNewUrlParser: true }
  )
  const { accountsGraphQL } = setUpAccounts(mongooseConnection.connection)

  const typeGraphqlSchema = await buildSchema({
    resolvers: [UserResolver],
    globalMiddlewares: [TypegooseMiddleware],
    // scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
    emitSchemaFile: true,
    authChecker,
  })

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives,
    },
  })

  const server = new ApolloServer({
    schema: mergeSchemas({
      schemas: [schema, typeGraphqlSchema],
    }),
    context: accountsGraphQL.context,
    formatError: error => {
      console.error(error)
      return error
    },
    playground: true,
  })

  await server.listen({ port: process.env.PORT || 4000 })
  console.log(`🚀 Server ready at localhost:${process.env.PORT || 4000}`)
})()