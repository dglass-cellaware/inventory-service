const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');
const inv_core = require('../inventory');



module.exports = {

    listInventoryContainer(inv_ctr_id) {
        return cellaware_sqlite.executeSelect('inv_ctr', { "inv_ctr_id": inv_ctr_id });
    }

};