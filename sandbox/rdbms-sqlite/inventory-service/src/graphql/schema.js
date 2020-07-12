const { gql } = require('apollo-server');

const typeDefs = gql`

    type Inventory {
        inv_id: String
        inv_uom: String
        inv_par_id: String
        inv_ctr_id: String
        attributes: [InventoryAttribute]
    }

    input InventoryInput {
        inv_id: String!
        inv_uom: String!
        inv_par_id: String
        inv_ctr_id: String
        attributes: [InventoryAttributeInput]
    }

    type InventoryAttribute {
        inv_attr_id: Int
        inv_id: String
        item_id: String
        item_cfg_id: String
        qty: Int
    }

    input InventoryAttributeInput {
        inv_id: String
        item_id: String
        item_cfg_id: String
        qty: Int
    }

    type InventoryContainer {
        inv_ctr_id: String
        inv_ctr_typ: String
        cur: Int
        max: Int
        inventory: [Inventory]
    }

    type Query {
        inventory(inv_id: String!): [Inventory]
        inventoryAttributes(inv_id: String!): [InventoryAttribute]
        inventoryContainer(inv_ctr_id: String!): InventoryContainer
    }

    
    type Mutation {
        createInventory(input: InventoryInput!): [Inventory]
        removeInventory(inv_id: String!): [Inventory]
        createInventoryAttribute(input: InventoryAttributeInput!): [InventoryAttribute]
        removeInventoryAttribute(inv_attr_id: String!): InventoryAttribute
        removeInventoryAttributes(inv_id: String!): [InventoryAttribute]
    }
`

module.exports = typeDefs;