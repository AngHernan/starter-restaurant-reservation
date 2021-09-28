/**
 * List handler for reservation resources
 */
 const service = require("./reservations.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
 async function list(req, res) {
  const data = await service.list();
  
  res.json({data});
}


async function read(req, res){
  const reservationsList = await service.read(req.params.date)
  const reservationData = reservationsList[1]
  res.json({reservationData})
}

async function create(req, res){
  const newReservation = ({
    first_name, 
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people } = res.locals);

  const createdReservation = await service.create(newReservation);

  res.status(201).json({ data: createdReservation });
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
  next({status: 400, message: "last_name is missing"})
}

function hasMobileNumber(req, res, next){
  const {data: {mobile_number} = {}} = req.body;
  if(mobile_number){
    res.locals.mobile_number = mobile_number;
    return next();
  }
  next({status: 400, message: "mobile_number is missing"})
}

function hasReservationDate(req, res, next){
  const {data: {reservation_date} = {}} = req.body;
  if(reservation_date){
    res.locals.reservation_date = reservation_date;
    return next();
  }
  next({status: 400, message:"reservation_date is missing"})
}

function hasReservationTime(req, res, next){
  const {data: {reservation_time} = {}} = req.body;
  if(reservation_time){
    res.locals.reservation_time = reservation_time;
    return next();
  }
  next({status: 400, message: "reservation_time is missing"})
}

function hasPeople(req, res, next){
  const {data: {people} = {}} = req.body;
  if(people > 0 && people){
    res.locals.people = people;
    return next();
  }
  next({status: 400, message: "people quantity not valid"})
}

function peopleNan(req, res, next){
  const people = res.locals.people;
  if(Number.isInteger(people)){
   return next();
  }
  next({status: 400, message: "people is not a number"});
}

{function validDate(req, res, next){
  const date = res.locals.reservation_date;
  let valid = new Date(date)
  if(valid){
    return next();
  }
  next({status:400, message: "reservation_date is not valid"})
}
//let date = new Date('hello')
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
        asyncErrorBoundary(create)
      ],
    
      read: [
        asyncErrorBoundary(read)
      ]
};