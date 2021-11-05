export function validateReservation(reservation, errors){
    errors.messages = [];
    const {
        first_name,
        last_name,
        mobile_number,
        reservation_time,
        reservation_date,
        people,
    } = reservation;  

    const current = new Date();
    const resDate = `${reservation_date} ${reservation_time}`
    const valid = new Date(`${reservation_date} ${reservation_time}`);
    const validUTC = new Date(valid.toUTCString());

    if (!valid) errors.messages.push("not valid date");
    if(!first_name) errors.messages.push("Missing first name");
    if(!last_name) errors.messages.push("Missing last name");
    if(!mobile_number) errors.messages.push("Missing mobile number");
    if(!reservation_time) errors.messages.push("Missing time");
    if(!reservation_date)errors.messages.push("Missing date");
    if(!people) errors.messages.push("Missing paty size");

    if(valid.toString() === 'Invalid Date'){
        errors.messages.push(`${resDate} ${typeof(resDate)}||| ${typeof(`${reservation_date} ${reservation_time}`)}||${reservation_date} ${reservation_time} ||| ${typeof(reservation_date)} ${typeof(reservation_time)} ||| ${new Date(`${reservation_date} ${reservation_time}`)} ${valid.toString() === 'Invalid Date'} Date is not valid`); 
    };

    if(validUTC < current){
        errors.messages.push('Date must be in the future'); 
    };
    if(valid.getDay() === 2){
        errors.messages.push('closed on tuesdays');
    };
    if(reservation_time < "10:30"){
        errors.messages.push('Pick a later time, we open at 10:30 AM');
      }
    if(reservation_time > "21:30"){
        errors.messages.push('Pick an earlier time, we close at 9:30 PM');
      };
    if(errors.messages.length > 0){
        return false;
    };

    return true;
}

export function validateSeating(table, people, errors){

    console.log("here:", table);

    if(table.occupied === true){
        errors.messages.push('Table is occupied');
    };

    if(table.capacity < people){
        errors.messages.push('Table capacity not large enough');
    };

    if(errors.messages.length > 0){
        return false;
    };

    return true;
};