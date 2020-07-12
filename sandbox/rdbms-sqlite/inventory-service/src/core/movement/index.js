const cellaware_sqlite = require('@cellaware/sqlite-json-wrapper');

function directMove(inv_mov_args) {

}

function partialSplit(inv_mov_args) {

}

function validateFullMove(inv_mov_args) {

}

function fullMove(inv_mov_args) {

}

module.exports = {
    

    /* inv_mov_args is an object with the following attributes
     * ** OPTIONAL
     * src_inv_id
     * src_ctr_idz
     * dst_inv_id
     * dst_ctr_id
     */
    moveInventory(inv_mov_args) {
        //validate args
        if (!inv_mov_args.src_inv_id && !inv_mov_args.src_ctr_id) {
            throw "No Source";
        }
        if (!inv_mov_args.dst_inv_id && !inv_mov_args.dst_ctr_id) {
            throw "No Destination";
        }

        //Determine type of move
        if (inv_mov_args.src_inv_id && inv_mov_args.dst_inv_id) {
            directMove(inv_mov_args);
        }
        else if (inv_mov_args.src_inv_id && inv_mov_args.dst_ctr_id) {
            partialSplit(inv_mov_args);
        }
        else if (inv_mov_args.src_ctr_id && inv_mov_args.dst_inv_id) {
            validateFullMove(inv_mov_args);
            fullMove(inv_mov_args);
        }
        else {
            fullMove(inv_mov_args);
        }
    }

};