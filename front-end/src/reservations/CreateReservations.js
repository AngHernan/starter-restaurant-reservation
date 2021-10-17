import React, { useState} from "react";
import {useHistory} from "react-router-dom";
import {createReservation} from "../utils/api";

export default function CreateReservation(){
    const [newReservation, setNewReservation] = useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewReservation({...newReservation, [name]: value});

    }

    const handleSubmit = (event) => {
        const abortController = new AbortController();
        console.log("before submitting",newReservation);
        console.log("date", newReservation.reservation_date);
        event.preventDefault();
        async function callCreateReservation(){
            try {
                const reservation = {
                    ...newReservation,
                    people: Number(newReservation.people),
                }

                await createReservation({data: reservation}, abortController.signal);
                console.log("after",reservation);
                console.log("date", reservation.reservation_date);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.info('Aboorted');
                } else {
                    throw err;
                };
            };
        };
        callCreateReservation();
    
        return () => {
            abortController.abort();
        }
    }
    
    const history = useHistory();

    return (
        <form>
            <div className="mb-3">
                <label for="first_name" className="form-label">First Name:</label>
                <input type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" value={newReservation?.first_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="last_name" className="form-label">Last Name:</label>
                <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" value={newReservation?.last_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="mobile_number" className="form-label">Mobile Number:</label>
                <input type="tel" className="form-control" name="mobile_number" id="mobile_number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Mobile Number" value={newReservation?.mobile_number} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label for="reservation_date" className="form-label">Date of reservation:</label>
                <input type="date" className="form-control" name="reservation_date" id="reservation_date" placeholder="Date of Reservation" value={newReservation?.reservation_date} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="reservation_time" className="form-label">Time of reservation:</label>
                <input type="time" className="form-control" name="reservation_time" id="reservation_time" placeholder="Time of Reservation" value={newReservation?.reservation_time} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="people" className="form-label">Number of people:</label>
                <input type="number" min="1" pattern="\d+" className="form-control" name="people" id="people" placeholder='10' value={newReservation?.people} onChange={handleChange}/>
            </div>
            <button onClick={() => history.goBack()} type="cancel" className="buttonSpace btn btn-secondary">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
}