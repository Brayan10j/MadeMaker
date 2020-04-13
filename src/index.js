const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const server = new ApolloServer({ typeDefs, resolvers });


require('dotenv').config();

// Initializations
const app = require('./server');


// middlewares  -- funciones antes que llegue al server (esto solo es pa graphql [prueba])
server.applyMiddleware({ app });

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});







