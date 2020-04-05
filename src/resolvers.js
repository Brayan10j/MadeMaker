const User = require('./models/User');

const resolvers = {
  Query: {
       async Users(){
       return await User.find();

      } 
  },
  Mutation: {
    createUser: async (parent, args, { Input }) => {
      //const newUser = await new User(args).save();
      console.log('esoo');
      return User;
    }
  }
};

module.exports = resolvers ;
 

