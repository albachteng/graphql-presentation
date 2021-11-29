import { PrismaClient } from '@prisma/client';
import {
  queryType,
  objectType,
  makeSchema
} from '@nexus/schema';
import  express  from 'express';
import { graphqlHTTP } from 'express-graphql';

const prisma = new PrismaClient();

const Wizard = objectType({
    name: 'Wizard', 
    definition(t) {
        t.string('familiar', {nullable: true});
        t.string('specialization', {nullable: true});
    }
});

const Query = queryType({
    detinition(t) {
        t.list.field('allWizards', {
            type: 'Wizard',
            resolve: () => {prisma.wizard.findMany()}
        });
    }
});

const schema = makeSchema({
    types: [Wizard, Query]
});

const app = express();

app.use('/graphql', graphqlHTTP({schema}));

app.listen(4000);