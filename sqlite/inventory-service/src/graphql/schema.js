const { gql } = require('apollo-server');

const typeDefs = gql`

    type Inventory {
        inv_id: String
        inv_uom: String
        inv_par_id: String
        inv_ctr_id: String
        attributes: [InventoryAttribute]
        children: [Inventory]
    }

    type InventoryAttribute {
        inv_attr_id: Int
        inv_id: String
        item_id: String
        item_cfg_id: String
        qty: Int
    }

    type Query {
        inventory(id: String!): [Inventory]
    }

    type Mutation {
        foo: Int
    }
`

module.exports = typeDefs;