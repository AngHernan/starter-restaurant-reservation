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
    return knex("reservations").orderBy('reservation_time').distinct("reservations.*").where({"reservation_date": date})
}

function resTaken(date, time){
    return knex("reservations").orderBy('reservation_time').distinct("reservations.*").where({"reservation_date": date, "reservation_time": time});
}


function updateStatus (reservation_id, status){
    return knex("reservations")
      .where({ reservation_id: reservation_id })
      .update({ status: status })
      .returning("status");
  };

{/*
function seat(table_id, reservation_id) {
    return knex.transaction(async (transaction) => {
      await knex("reservations")
        .where({"id": reservation_id })
        .update({ status: "seated" })
        .transacting(transaction);

      return knex("tables")
        .where({ "table_id": table_id })
        .update({
            "occupied": true,
            "reservation_id": reservation_id 
        })
        .transacting(transaction)
        .then((records) => records[0]);
    });
}
    function update(table_id, reservation_id){
        return knex("tables")
            .select("*")
            .where({"table_id": table_id})
            .update({ reservation_id: reservation_id, occupied: true })
          
      };

    function unseat(table_id){
        return knex("tables")
            .select("*")
            .where({"table_id": table_id})
            .update({reservation_id: null, occupied: false})
    }*/}

    module.exports = {
    list,
    create,
    read,
    readDate,
    resTaken,
    updateStatus,
}