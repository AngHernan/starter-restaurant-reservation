const knex = require("../db/connection")

function list(){
    return knex("tables").orderBy('table_name').select("*");
 }

 function create(table){
    return knex("tables").insert(table,"*").then((updatedRecords) => updatedRecords[0]);
}

function read(table_id){
    return knex("tables").select("tables.*").where({"table_id":table_id}).first();
}
module.exports = {
    list,
    create,
    read,
}