const resolvers = {
    Query: {
        async listInventory(root, { id }) {

        }
    }, Mutation: {
        async createInventory(root, { id, uomId, parentId, containerId }) {

        },
        async deleteInventory(root, { id }) {

        },
        async createInventoryAttribute(root, { inventoryId, itemId, qty, lotId, status }) {

        }
    }
}

module.exports = resolvers