const date = "20:00:00"
const time = "2020-12-31"
const date1 = (time + ' ' + date)
let valid = new Date(date1)

const current = new Date()

if(valid.getDay() === 2){ console.log('tuesday')} else { console.log('not tuesday')}
console.log(valid.getHours())
console.log(valid.getMinutes())
console.log(valid.toString().split(' ')[0])
console.log(valid.getDay() === 2)


{/*
function validTime(req, res, next){
  const resDate = res.locals.reservation_date;
  const resTime = res.locals.reservation_time;
  const timeDate = resDate + ' ' + resTime;

  const open = resDate + " 10:30";
  const hourB4 = resDate + " 21:30";

  const earliest = new Date(open)
  const latest = new Date(hourB4);
  const resTimeDate = new Date(timeDate);

  if(resTimeDate <= earliest && resTimeDate >= latest){
    return next();
  }
  next({status: 400, message: "reservation time is not valid"})
}
*/}