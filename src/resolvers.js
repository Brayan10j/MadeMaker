const User = require('./models/User');

const resolvers = {
  Query: {
       async Users(){
       return await User.find();

      } 
  },
  Mutation: {
    createUser: async ( _ , args) => {
      
      const emailUser = await User.findOne({email: args.email});
      if(emailUser) {
        console.log("email ya existe");
        return "Email ya existe"
      } else {
        // Saving a New User
        const newUser = new User({
          name: args.name,
          email: args.email,
          password :args.password
          });
        newUser.password = await newUser.encryptPassword(args.password);
        await newUser.save();
        return "Registrado"
        
      }
      
    }
  }
};

module.exports = resolvers ;
 

