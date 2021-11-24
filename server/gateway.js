const { RemoteGraphQLDataSource, ApolloGateway } = require('apollo-server');

// subgraph timeout (credit Mandi Wise)

const gateway = new ApolloGateway({
    //...
    buildService({ name, url }) {
        // 3 second timeout on requests to subgraph
        const fetcher = (input, init) => {
            if (init) {
                init.timeout = 3000;
            } else {
                init = { timeout: 3000 };
            }
            return fetch(input, init);
        };
        return new RemoteGraphQLDataSource({
            url, fetcher
        });
    }
});

