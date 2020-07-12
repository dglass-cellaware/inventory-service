var assert = require('assert')
const { createTestClient } = require('apollo-server-testing');
const { query, mutate } = createTestClient(server);

/* Helper functions */

module.exports = {

    getTestPrtnum1() {
        return "TEST001";
    },

    createTestInventory(inv_id) {
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
}