const inv_core = require('../core/inventory');
const inv_ctr_core = require('../core/inventory-container');

const resolvers = {
    Query: {
        inventory: async function (root, args) {
            var res = await inv_core.listInventory({ "inv_id": args.inv_id });
            return res;
        },
        inventoryContainer: async function (root, args) {
            var res = await inv_ctr_core.listInventoryContainer(args.inv_ctr_id);
            // Just expecting 1 record.
            return res[0];
        }
    }, Mutation: {
        createInventory: async function (root, { input: inventoryInput }) {
            var res = await inv_core.createInventory(inventoryInput.inv_id, inventoryInput.inv_uom, inventoryInput.inv_par_id, inventoryInput.inv_ctr_id);
            res = await inv_core.listInventory({ "inv_id": inventoryInput.inv_id });
            return res;
        }
    }, InventoryContainer: {
        inventory: async function (inventoryContainer) {
            var res = inv_core.listInventory({ "inv_ctr_id": inventoryContainer.inv_ctr_id });
            return res;
        }
    }
}

module.exports = resolvers