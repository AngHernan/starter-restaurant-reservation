import React, { useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {updateReservationInfo, readReservation} from "../utils/api";
import { validateReservation } from "../utils/validations";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsTime } from "../utils/date-time";


export default function EditReservation(){
    const [errors, setErrors] = useState({"messages":[]});
    const history = useHistory();
    const {reservation_id} = useParams();

    
    const [currentReservation, setCurrentReservation] = useState({});
    const [currentReservationError, setCurrentReservationError] = useState(null);

    useEffect(loadReservation, [reservation_id]);

    function loadReservation(){
        const abortController = new AbortController();
        setCurrentReservationError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .catch(setCurrentReservationError)
        return () => abortController.abort();
        }


    const handleChange = (event) => {
        setErrors({"messages": [] });
        const { name, value } = event.target;
        setCurrentReservation({...currentReservation, [name]: value});
    }

    const handleSubmit = async (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        const validated = validateReservation(currentReservation, errors);

        if(!validated){
            setErrors({...errors})
            return errors.messages;
        }

        const reservation = {
                    ...currentReservation,
                    reservation_time: formatAsTime(currentReservation.reservation_time),
                    people: Number(currentReservation.people),
        }

        await updateReservationInfo(currentReservation.reservation_id, {data: reservation}, abortController.signal)
        .then(() => {history.push({
                pathname: "/dashboard",
                search:`?date=${currentReservation.reservation_date}`
        })})
        return () => {
            abortController.abort();
        }
    }
    
    const errorDisplay = `Resolve these issues: ${errors.messages.join(',\n ')} !`;
    
    return (<>
        <div className="container p-3 my-2 bg-dark text-white">
            <div className="row m-5 justify-content-center">
                <div className="col-4.5  p-3 bg-dark text-white">
                    <h1 className="m-3">Edit a Reservation</h1>
                </div>
            </div>
        </div>
        <div className="container p-3 my-2">  
        <form>
            <ErrorAlert error={currentReservationError}/>
            {errors.messages.length? <div className="alert alert-danger" role="alert">
  {errorDisplay}</div>: <div></div>}
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name:</label> 
                <input type="text" className="form-control" name="first_name" id="first_name" value={currentReservation?.first_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name:</label>
                <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" value={currentReservation?.last_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="mobile_number" className="form-label">Mobile Number:</label>
                <input type="tel" className="form-control" name="mobile_number" id="mobile_number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" value={currentReservation?.mobile_number} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="reservation_date" className="form-label">Date of reservation:</label>
                <input type="date" className="form-control" name="reservation_date" id="reservation_date" placeholder="Date of Reservation" value={currentReservation?.reservation_date} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="reservation_time" className="form-label">Time of reservation:</label>
                <input type="time" className="form-control" name="reservation_time" id="reservation_time" placeholder="Time of Reservation" value={currentReservation?.reservation_time} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="people" className="form-label">Number of people:</label>
                <input type="number" min="1" pattern="\d+" className="form-control" name="people" id="people" placeholder='10' value={currentReservation?.people} onChange={handleChange}/>
            </div>
            <button onClick={() => history.goBack()} type="cancel" className="buttonSpace btn btn-outline-secondary">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="btn btn-outline-primary m-2">Submit</button>
        </form>
        </div>
   </> )
}