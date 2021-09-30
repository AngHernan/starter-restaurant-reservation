/**
 * List handler for reservation resources
 */
 const service = require("./reservations.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
 async function list(req, res) {
  const date = req.query.date;
  const data = date ? await service.readDate(date) : await service.list();
  //Sort them now
  res.json({data});
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `reservation_id not found: ${reservation_id}` });
}

async function read(req, res){
  const reservation = await service.read(res.locals.reservation_id);
  
  res.json({reservation})
}

async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function hasFirstName(req, res, next){
  const {data: {first_name} = {}} = req.body;
  if(first_name){
      res.locals.first_name = first_name;
   return next()
  }
    next({status: 400, message: "first_name is missing"}); 
  }

function hasLastName(req, res, next){
  const {data: {last_name} = {}} = req.body;
  if(last_name){
    res.locals.last_name = last_name;
    return next();
  }
  next({status: 400, message: "last_name is missing"});
}

function hasMobileNumber(req, res, next){
  const {data: {mobile_number} = {}} = req.body;
  if(mobile_number){
    res.locals.mobile_number = mobile_number;
    return next();
  }
  next({status: 400, message: "mobile_number is missing"});
}

function hasReservationDate(req, res, next){
  const {data: {reservation_date} = {}} = req.body;
  if(reservation_date){
    res.locals.reservation_date = reservation_date;
    return next();
  }
  next({status: 400, message:"reservation_date is missing"});
}

function hasReservationTime(req, res, next){
  const {data: {reservation_time} = {}} = req.body;
  if(!reservation_time){
    next({status: 400, message: "reservation_time is missing"});
  }
  var military = /^\s*([01]?\d|2[0-3]):[0-5]\d\s*$/i;
  var standard = /^\s*(0?\d|1[0-2]):[0-5]\d(\s+(AM|PM))?\s*$/i;
 
  if(reservation_time.match(military) || reservation_time.match(standard)){
    res.locals.reservation_time = reservation_time;

    return next();
  }
  next({status: 400, message: "reservation_time isn't valid"});
}

function hasPeople(req, res, next){
  const {data: {people} = {}} = req.body;
  if(people > 0 && people){
    res.locals.people = people;
    return next();
  }
  next({status: 400, message: "people quantity not valid"});
}

function peopleNan(req, res, next){
  const people = res.locals.people;
  if(Number.isInteger(people)){
   return next();
  }
  next({status: 400, message: "people is not a number"});
}

function validDate(req, res, next){
  const date = res.locals.reservation_date;
  let valid = new Date(date)
  if(valid.toString() != 'Invalid Date'){
    return next();
  }
  next({status:400, message: "reservation_date is not valid"});
  }

function notPast(req, res, next){ 
  const date = res.locals.reservation_date;
  const current = new Date()
  let valid = new Date(date)
  if(valid > current){
    return next();
  }
  next({status:400, message: "resrvation must be in the future"});
  }


function notTues(req, res, next){ 
  let date = res.locals.reservation_date;
  let valid = new Date(date)
  if(valid.getDay() === 2){
    
    return next();
  }
  next({status:400, message: "closed on Tuesdays"});
  }

async function resTaken(req, res, next){
  const resTime = res.locals.reservation_time;
  const resDate = res.locals.reservation_date;

  const taken = await service.resTaken(resDate, resTime);
  if(!taken){
    return next();
  }
  next({status:400, message: "time taken"});
}

module.exports = {
  
    list: [
      asyncErrorBoundary(list)],
    
    create: [
        hasFirstName, 
        hasLastName, 
        hasMobileNumber, 
        hasReservationDate, 
        hasReservationTime, 
        hasPeople,
        peopleNan,
        validDate,
        notPast,
        notTues,
        resTaken,
        asyncErrorBoundary(create)
      ],
    
      read: [
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(read)
      ],
};