const express = require('express');

const app = express.app();

app.use('/api', graphQLServer({
    validationRules: [depthLimit(10)]
}));

const PaginationAmount = GraphQLInputInit