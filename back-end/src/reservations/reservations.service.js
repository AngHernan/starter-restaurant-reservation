const knex = require("../db/connection");

function list(){
   return knex("reservations").select("*")
}

function create(reservation){
    return knex("reservations").insert(reservation)
}    

function read(date){
    return knex("reservations").select("*").where({"reservation_date": date})
}

module.exports = {
    list,
    create,
    read,
}