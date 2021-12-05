const { ApolloServer } = require('apollo-server');
const { gql } = require('graphql-tag');

const wizards = [];
const spells = [];
let id = 0;

const typeDefs = gql`

    type Wizard {
        name: String!
        id: ID!
        spells: [Spell!]!
        level: Int!
    }

    type Spell {
        name: String!
        id: ID!
        level: Int!
        desc: String!
        # knownBy: [Wizard!]!
    }
    
    input WizardInput {
        name: String!
        spells: [SpellInput!]!
        # initialize level at 1
    }

    input SpellInput {
        name: String!
        level: Int!
        desc: String!
        # knownBy: [Wizard!]!
    }

    type Query {
        allWizards: [Wizard!]!
        allSpells: [Spell!]!
        wizardByName(name: String!): Wizard!
    }
    
    type Mutation {
        levelUpByName(name: String!): Wizard!
        createWizard(input: WizardInput!): Wizard!
        createSpell(input: SpellInput!): Spell!
    }
    
`;

const resolvers = {

    Query: {
        allWizards: () => wizards,
        allSpells: () => spells,
        wizardByName: (parent, args) => {
            return wizards.filter(wiz => wiz.name === args.name);
        },
    },

    Mutation: {

        createSpell: (parent, args) => {
            const newSpell = {
                id: id += 1,
                level: 1,
                ...args.input,
            }
            spells.push(newSpell);
            return newSpell;
        },

        createWizard: (parent, args) => {
            const newWizard = {
                id: id += 1,
                level: 1,
                ...args.input,
            }
            wizards.push(newWizard);
            return newWizard;
        },

        levelUpByName: (parent, args) => {
            const wiz = wizards.find(wiz => wiz.name === args.name);
            wiz.level += 1;
            return wiz;
        },
        


    },

};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url}) => console.log(`graphql running at ${url}`));