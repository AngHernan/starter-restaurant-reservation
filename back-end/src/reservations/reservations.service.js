const knex = require("../db/connection");

function list(){
   return knex("reservations").select("*")
}

function create(reservation){
    return knex("reservations").insert(reservation,"*").then((updatedRecords) => updatedRecords[0]);
}

function read(reservation_id){
    return knex("reservations").select("reservations.*").where({"reservation_id": reservation_id}).first();
}

function readDate(date){
    return knex("reservations").distinct("reservations.*").where({"reservation_date": date})
}

module.exports = {
    list,
    create,
    read,
    readDate,
}