const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');
const inv_core = require('../inventory');

module.exports = {

    listInventoryContainer(whereJson) {
        return cellaware_sqlite.executeSelect('inv_ctr', whereJson);
    }

};