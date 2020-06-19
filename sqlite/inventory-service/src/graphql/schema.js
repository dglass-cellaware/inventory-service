const { gql } = require('apollo-server');

const typeDefs = gql`

    type Inventory {
        inv_id: String
        inv_uom: String
        inv_par_id: String
        inv_ctr_id: String
        attributes: [InventoryAttribute]
    }

    type InventoryAttribute {
        inv_attr_id: Int
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
        inventoryContainer(inv_ctr_id: String!): InventoryContainer
    }

    type Mutation {
        foo: Int
    }
`

module.exports = typeDefs;