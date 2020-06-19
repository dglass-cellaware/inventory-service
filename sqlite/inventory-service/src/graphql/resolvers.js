const inv_core = require('../core/inventory');

const resolvers = {
    Query: {
        inventory: async function (root, args) {
            var res = await inv_core.listInventoryWithAttributes(args.id);
            return res;
        }
    }, Mutation: {
        foo: function () {
            return 5;
        }
    }
}

module.exports = resolvers