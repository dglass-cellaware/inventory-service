const inv_core = require('../core/inventory');
const inv_ctr_core = require('../core/inventory-container');

const resolvers = {
    Query: {
        inventory: async function (root, args) {
            var res = await inv_core.listInventory(args.inv_id);
            return res;
        },
        inventoryContainer: async function (root, args) {
            var res = await inv_ctr_core.listInventoryContainer(args.inv_ctr_id);
            // Just expecting 1 record.
            return res[0];
        }
    }, Mutation: {
        foo: function () {
            return 5;
        }
    }, InventoryContainer: {
        inventory: async function (invCtr) {
            var res = inv_ctr_core.listInventory(invCtr.inv_ctr_id);
            return res;
        }
    }
}

module.exports = resolvers