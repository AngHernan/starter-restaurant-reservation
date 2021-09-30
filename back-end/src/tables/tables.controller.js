const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service")

async function list(req, res) {
    const data = await service.list();
    res.json({data});
  }


function hasName(req, res, next){
  const {data: {table_name} = {}} = req.body;
  if(table_name){
    res.locals.table_name = table_name;
    return next();
  }
  next({status: 400, message:"table_name is missing"});
}

function nameValid(req, res, next){
  const table = res.locals.table_name;
  if(table.length > 1){
    return next();
  }
  next({status: 400, message:"table_name is not valid"});
}

function hascapacity(req, res, next){
  const {data: {capacity} = {}} = req.body;
  if(capacity && Number.isInteger(capacity)){
    res.locals.capacity = capacity;
    return next();
  }
  next({status: 400, message:"capacity is missing"});
}


async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function tableExists(req, res, next){
  const table = await service.read(req.params.table_id);
  if(table){
    res.locals.table = table;
    return next();
  }
  next({status: 400, message:"table_id does not exist"})
}

function hasReservId(req, res, next){
  const {data: {reservation_id} = {}} = req.body;
  if(reservation_id){
    res.locals.table.reservation_id = reservation_id;
    return next();
  }
  next({status: 400, message: "missing reservation_id"});
}

async function reservationExists(req, res, next){
const reservation = await reservationService.read(req.params.reservation_id)
  if(reservation){
    res.locals.reservation = reservation;
    return next();
  }
  next({status:404, message: "Reservation does not exist"});
}

function hasCap(req, res, next){
  const { data: {capacity} = {}} = req.body;
  if(capacity <= res.locals.capacity){
    return next();
  }
  next({status:400, message: "not enough capacity"})
}


module.exports = {
    list: [
      asyncErrorBoundary(list)
    ],

    create: [
      hasName,
      nameValid,
      hascapacity,
      asyncErrorBoundary(create)
    ],

    seat: [
      asyncErrorBoundary(tableExists),
      hasReservId,
      hasCap,
      asyncErrorBoundary(reservationExists),
    ],
};