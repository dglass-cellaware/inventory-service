
const sqlite = require('@cellaware/sqlite-json-wrapper');
const dotenv = require('dotenv').config();

module.exports = {

    listInventory(id) {
        const sql = `with inventory_CTE as
                    (
                    select inventory.* from inventory where id = '${id}' 
                    union all
                    select inventory.* from inventory_CTE inner join inventory on inventory.parent_id = inventory_CTE.id 
                    )
                    select inventory_CTE.* 
                        from inventory_CTE`;

        return sqlite.executeQuery(process.env.DB_PATH, sql);

    },
    listInventoryAttributes(inventoryId) {
        const sql = `select * from inventory_attributes where inventory_id = '${inventoryId}'`;
        return sqlite.executeQuery(process.env.DB_PATH, sql);
    }
};