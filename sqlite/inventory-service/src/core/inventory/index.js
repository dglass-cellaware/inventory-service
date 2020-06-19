const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');



module.exports = {

    listInventory(inv_id) {

        const invSql = `with inv_cte as
                    (
                    select inv.* from inv where inv_id = '${inv_id}' 
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_cte.* 
                        from inv_cte`;

        return cellaware_sqlite.executeQuery(invSql);


    },
    async listInventoryWithAttributes(inv_id) {

        const invSql = `with inv_cte as
                    (
                    select inv.* from inv where inv_id = '${inv_id}' 
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_cte.* 
                        from inv_cte`;

        const invAttrSql = `with inv_cte as
                    (
                    select inv.* from inv where inv_id = '${inv_id}' 
                    union all
                    select inv.* from inv_cte inner join inv on inv.inv_par_id = inv_cte.inv_id
                    )
                    select inv_attr.*
                        from inv_cte inner join inv_attr on inv_cte.inv_id = inv_attr.inv_id`;

        var invRes = await cellaware_sqlite.executeQuery(invSql);
        var invAttrRes = await cellaware_sqlite.executeQuery(invAttrSql);

        console.log(invAttrRes);

        return invRes;


    },
    listInventoryAttributes(inv_id) {
        return cellaware_sqlite.executeSelect('inv_attr', { "inv_id": inv_id });
    }


};