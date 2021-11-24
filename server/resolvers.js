const resolvers = {
    //... note that you could implement authorization at any point in chain
    // i.e. in the resolver itself, at the server entrypoint, middleware...
    // you could even do it outside of graphQL entirely, in, say, a REST api
    me: (parent, args, context) => {
        if (!context.user) {
            return null;
        }
        return context.models.User.getById(context.user.id);
    }
    // this is also a valid place to set timeouts
}