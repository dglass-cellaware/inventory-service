const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');



module.exports = {

    // Returns as array of inventory objects, just in case there are children.
    // Includes inventory attributes inline with inventory as array.
    async listInventory(where) {

        var whereClause = cellaware_sqlite.buildWhereClause(where);

        const invSql = `with inv_cte as
                    (
                    select inv.* from inv ${whereClause}
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_cte.* 
                        from inv_cte`;

        const invAttrSql = `with inv_cte as
                    (
                    select inv.* from inv ${whereClause}
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
    async listInventoryAttribute(inv_attr_id) {
        return cellaware_sqlite.executeSelect('inv_attr', { "inv_attr_id": inv_attr_id });
    },
    async listInventoryAttributes(inv_id) {
        return cellaware_sqlite.executeSelect('inv_attr', { "inv_id": inv_id });
    },
    async createInventory(inv_id, inv_uom, inv_par_id, inv_ctr_id) {
        return cellaware_sqlite.executeInsert('inv', { "inv_id": inv_id, "inv_uom": inv_uom, "inv_par_id": inv_par_id, "inv_ctr_id": inv_ctr_id });
    },
    async removeInventory(inv_id) {

        var listRes = await this.listInventory({ "inv_id": inv_id });

        var removeSqls = [];
        for (var i = 0; i < listRes.length; i++) {
            removeSqls.push(cellaware_sqlite.buildDelete("inv", { "inv_id": listRes[i].inv_id }));
            removeSqls.push(cellaware_sqlite.buildDelete("inv_attr", { "inv_id": listRes[i].inv_id }));
        }

        return cellaware_sqlite.executeBatch(removeSqls);
    },
    async createInventoryAttribute(inv_id, item_id, item_cfg_id, qty) {
        return cellaware_sqlite.executeInsert('inv_attr', { "inv_id": inv_id, "item_id": item_id, "item_cfg_id": item_cfg_id, "qty": qty });
    },
    async removeInventoryAttribute(inv_attr_id) {
        return cellaware_sqlite.executeDelete('inv_attr', { "inv_attr_id": inv_attr_id });
    },
    async removeInventoryAttributes(inv_id) {
        return cellaware_sqlite.executeDelete('inv_attr', { "inv_id": inv_id });
    }

};