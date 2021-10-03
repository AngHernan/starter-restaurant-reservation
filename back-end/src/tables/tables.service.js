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

function findRes(reservation_id){
    return knex("reservations").select("reservations.*").where({"reservation_id": reservation_id}).first();
}

function update(table_id, reservation_id){
    return knex("tables")
        .select("*")
        .where({"table_id": table_id})
        .update({ reservation_id: reservation_id, occupied: true })
        
    };

module.exports = {
    list,
    create,
    read,
    findRes,
    update,
}