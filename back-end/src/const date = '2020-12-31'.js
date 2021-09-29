const date = '20:00:00'
let valid = new Date(date)
valid.toString()
if(valid.toString() === 'Invalid Date'){ console.log('true')} else { console.log('false')}
console.log(valid)
console.log(typeof(valid.toString()))