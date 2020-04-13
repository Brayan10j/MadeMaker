const { gql } = require('apollo-server-express');
const schema = gql`
type Query {
  Users: [User]
}

type Mutation {
  createUser(
    name: String!
    email: String!
    password: String!
  ): String
}

type User{
  _id :ID
  name: String!
  email: String!
  password: String!
  date: String
}


`;

module.exports = schema ;



