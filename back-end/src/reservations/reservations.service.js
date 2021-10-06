const knex = require("../db/connection");

function list(){
    return knex("reservations")
        .select("*")
}

function create(reservation){
    return knex("reservations")
        .insert(reservation,"*")
        .then((updatedRecords) => updatedRecords[0]);
}

function read(reservation_id){
    return knex("reservations")
        .select("reservations.*")
        .where({"reservation_id": reservation_id})
        .first();
}

function readDate(date){
    return knex("reservations")
        .whereNot({"status": "finished"})
        .orderBy('reservation_time')
        .distinct("reservations.*")
        .where({"reservation_date": date})
}

function resTaken(date, time){
    return knex("reservations")
        .orderBy('reservation_time')
        .distinct("reservations.*")
        .where({"reservation_date": date, "reservation_time": time});
}


function updateStatus (reservation_id, status){
    return knex("reservations")
      .where({ reservation_id: reservation_id })
      .update({ status: status })
  };

function statusUpdate(reservation_id, status){
    return knex("reservations")
        .where({ reservation_id: reservation_id })
        .update({ status: status })
        .returning("status")
}

    module.exports = {
    list,
    create,
    read,
    readDate,
    resTaken,
    updateStatus,
    statusUpdate,
}