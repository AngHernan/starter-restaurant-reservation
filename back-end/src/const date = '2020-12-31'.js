const date = '2030-01-02'
let valid = new Date(date)

const current = new Date()

if(valid.getDay() === 2){ console.log('tuesday')} else { console.log('not tuesday')}
console.log(valid.getDay())
console.log(valid.toString().split(' ')[0])
console.log(valid.getDay() === 2)