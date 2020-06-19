const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');
const inv_core = require('../inventory');



module.exports = {

    listInventoryContainer(inv_ctr_id) {
        return cellaware_sqlite.executeSelect('inv_ctr', { "inv_ctr_id": inv_ctr_id });
    },
    // Returns as array of inventory objects, just incase there are children.
    // Includes inventory attributes inline with inventory as array.
    async listInventory(inv_ctr_id) {

        const invSql = `with inv_cte as
                    (
                    select inv.* from inv where inv_ctr_id = '${inv_ctr_id}' 
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_cte.* 
                        from inv_cte`;

        const invAttrSql = `with inv_cte as
                    (
                    select inv.* from inv where inv_ctr_id = '${inv_ctr_id}'
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_attr.*
                        from inv_cte left join inv_attr on inv_cte.inv_id = inv_attr.inv_id`;

        var invRes = await cellaware_sqlite.executeQuery(invSql);
        var invAttrRes = await cellaware_sqlite.executeQuery(invAttrSql);

        // Both result sets are sorted the same way.
        for (i = 0; i < invRes.length; i++) {
            invRes[i].attributes = [];
            for (j = i; j < invAttrRes.length; j++) {
                if (invRes[i].inv_id === invAttrRes[j].inv_id) {
                    invRes[i].attributes.push(invAttrRes[j]);
                }
            }
        }

        return invRes;

    },

};