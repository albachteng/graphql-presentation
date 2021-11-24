const { ApolloServer } = require('apollo-server');
const { GraphQLInputInt } = require('graphql-input-number');
import getUser from './getUser';

const PaginationAmount = GraphQLInputInt({
    name: 'PaginationAmount',
    min: 1,
    max: 100,
});

// ...

// type Thread {
//     messages(
//         first: PaginationAmount,
//         after: String
//         ): [Message]
// }

// implement authentication with, say, a JWT and set it 
// on the context object for use downstream in specific resolvers
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUser(token);
        return { user };
    }
});

server.listen().then(({ url }) => {
    console.log(`server listening at ${url}`);
});