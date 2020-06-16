const core = require('../core');

const resolvers = {
    Query: {
        async listInventory(root, { id }) {
            var res = await core.listInventory(id);
            return res.data;
        }
    }, Mutation: {
        async createInventory(root, { id, uomId, parentId, containerId }) {

        },
        async deleteInventory(root, { id }) {

        },
        async createInventoryAttribute(root, { inventoryId, itemId, qty, lotId, status }) {

        }
    },
    Inventory: {
        async attributes(inventory) {
            var res = await core.listInventoryAttributes(inventory.id);
            return res.data;
        }
    }
}

module.exports = resolvers