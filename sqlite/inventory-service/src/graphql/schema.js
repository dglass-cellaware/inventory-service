const { gql } = require('apollo-server')

const typeDefs = gql`

    type Inventory {
        id: String!
        uom_id: String!
        parent_id: String
        container_id: String
        attributes: [InventoryAttribute]
    }

    type InventoryAttribute {
        id: Int!
        inventory_id: String!
        item_id: String!
        qty: Int!
        lot_id: String
        status: String
    }

    type Query {
        listInventory(id: String!): [Inventory]
    }

    type Mutation {
        createInventory(id: String!, uomId: String!, parentId: String, containerId: String): Int
        deleteInventory(id: String!): Int!
        createInventoryAttribute(inventoryId: String!, itemId: String!, qty: Int!, lotId: String, status: String): Int
    }
`

module.exports = typeDefs;