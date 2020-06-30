const inv_core = require('../core/inventory');
const inv_ctr_core = require('../core/inventory-container');
const movement = require('../core/movement');

const resolvers = {
    Query: {
        inventory: async function (root, args) {
            var res = await inv_core.listInventory({ "inv_id": args.inv_id });
            return res;
        },
        inventoryAttributes: async function (root, args) {
            var res = await inv_core.listInventoryAttributes({ "inv_id": args.inv_id });
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
            for (i = 0; i < inventoryInput.attributes.length; i++) {
                res = await inv_core.createInventoryAttribute(inventoryInput.inv_id, inventoryInput.attributes[i].item_id, inventoryInput.attributes[i].item_cfg_id, inventoryInput.attributes[i].qty)
            }
            res = await inv_core.listInventory({ "inv_id": inventoryInput.inv_id });
            return res;
        },
        createInventoryAttribute: async function (root, { input: inventoryAttributeInput }) {
            var res = await inv_core.createInventoryAttribute(inventoryAttributeInput.inv_id, inventoryAttributeInput.item_id, inventoryAttributeInput.item_cfg_id, inventoryAttributeInput.qty);
            res = await inv_core.listInventoryAttributes(inventoryAttributeInput.inv_id);
            return res;
        },
        moveInventory: async function (root, {input: moveInventoryInput}) {
            var res = await movement.moveInventory(moveInventoryInput);
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