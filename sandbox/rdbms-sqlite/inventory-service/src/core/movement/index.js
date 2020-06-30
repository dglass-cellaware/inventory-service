const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');

module.exports = {

    /* inv_mov_args is an object with the following attributes
     * ** OPTIONAL
     * src_inv_id
     * src_ctr_id
     * dst_inv_id
     * dst_ctr_id
     */
    moveInventory(inv_mov_args) {
        //Determine type of move
        src_inv_id = inv_mov_args.src_inv_id
        src_ctr_id = inv_mov_args.src_ctr_id
        dst_inv_id = inv_mov_args.dst_inv_id
        dst_ctr_id = inv_mov_args.dst_ctr_id

        if (!src_inv_id && !src_ctr_id) {
            throw "No Source"
        }
        if (!dst_inv_id && !dst_ctr_id) {
            throw "No Destination"
        }

        if (src_inv_id && dst_inv_id) {
            //direct move
        }
        else if (src_inv_id && dst_ctr_id) {
            //partial split
        }
        else if (src_ctr_id && dst_inv_id) {
            //only allowed if dst_inv_id is root level
        }
        else {
            //full move
        }
    }

};