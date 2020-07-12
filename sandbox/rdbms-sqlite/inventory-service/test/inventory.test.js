var assert = require('assert')
const { createTestClient } = require('apollo-server-testing');
const { query, mutate } = createTestClient(server);

/* Helper functions */

function createTestInventory(inv_id) {
    var res = await query({
        query: "createInventory",
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
}

/* Test Cases */

describe('Create Inventory', function() {
    describe('#create inventory api call', function() {
        it('should create inventory with id "Test0001"', function() {
            createTestInventory("Test0001");
        })
    }) 
})