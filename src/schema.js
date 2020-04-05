const schema = `
type Query {
  Users: [User]
}

type Mutation{
  createUser(input: Userinput): User
}

type User{
  _id :ID
  name: String!
  email: String!
  password: String!
  date: String
}

input Userinput{
  name: String!
  email: String!
  password: String!
  date: String
}
`;

module.exports = schema ;



