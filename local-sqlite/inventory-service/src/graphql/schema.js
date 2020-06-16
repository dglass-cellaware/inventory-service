const { gql } = require('apollo-server')

const typeDefs = gql`

    type Inventory {
        id: String!
        uomId: String!
        parentId: String
        containerId: String
        attributes: [InventoryAttribute]
        children: [Inventory]
    }

    type InventoryAttribute {
        inventoryId: String!
        itemId: String!
        qty: Int!
        lotId: String
        status: String
    }

    type Query {
        listInventory(id: String!): Inventory
    }

    type Mutation {
        createInventory(id: String!, uomId: String!, parentId: String, containerId: String): Int
        deleteInventory(id: String!): Int!
        createInventoryAttribute(inventoryId: String!, itemId: String!, qty: Int!, lotId: String, status: String): Int
    }
`

module.exports = typeDefs;