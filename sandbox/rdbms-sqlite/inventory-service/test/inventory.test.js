var assert = require('chai').assert;
var expect = require('chai').expect;
const gql = require('graphql-tag')
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../src/graphql/schema');
const resolvers = require('../src/graphql/resolvers');
const { ApolloServer } = require('apollo-server');
const { hasUncaughtExceptionCaptureCallback } = require('process');

const server = new ApolloServer({typeDefs, resolvers});

const { query, mutate } = createTestClient(server);


/* instantiate the db stuff */
const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');
cellaware_sqlite.cacheDbPath("db/inventory-service.db");


/* Mocks */

const CREATE_INVENTORY = gql`
    mutation createInventory($input: InventoryInput!) {
        createInventory(input: $input) {
            inventory: inventory
        }
    }
`

const REMOVE_INVENTORY = gql`
    mutation removeInventory($inv_id: String!) {
        removeInventory(inv_id: $inv_id) {
            inv_id: inv_id
        }
    }
`



/* Helper functions */

function getTestInv_id001() {
    return "Test0001"
}

async function createTestInventory(inv_id) {
    var res =  await mutate({
        query: CREATE_INVENTORY,
        variables: {
            input: {
                inv_id: inv_id,
                inv_uom: "TEST",
                inv_par_id: null,
                inv_ctr_id: null,
                attributes: null,
            },
        }
    });

    return res;
}

async function removeTestInventory(inv_id) {
    var res =  await mutate({
        query: REMOVE_INVENTORY,
        variables: {
            inv_id: inv_id,
        }
    });

    return res;
}

/* Test Cases */

describe('Create Inventory', function() {
    describe('#create inventory api call', function() {
        var res = null;
        it('createInventory runs"', async function() {
            res = await createTestInventory(getTestInv_id001());
        });
        it('createInventory returns an object', function() {
            expect(res).to.not.equal(undefined);
        });
        it('createInventory does not return an error', function() {
            expect(res.errors).to.equal(undefined);
        });
        it('createInventory returned the correct data', function() {
            console.log(res);
            expect(res.data.inv_id).to.equal(getTestInv_id001());
            /* This is a legit error but I am not going to resolve it right now --TODO */
        });
    });
});

describe('Remove Inventory', function() {
    describe('#remove inventory api call', function() {
        var res = null;
        it('removeInventory runs', async function() {
            res = await removeTestInventory(getTestInv_id001());
        });
        it('removeInventory returns an object', function() {
            expect(res).to.not.equal(undefined);
        });
        it('removeInventory does not return an error', function() {
            console.log(res);
            expect(res.errors).to.equal(undefined);
        });
    });
});