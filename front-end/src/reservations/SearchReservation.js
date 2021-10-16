import React, {useState}  from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationsView from "../dashboard/DashboardReservationsView";

export default function SearchReservation(){

    const [foundReservation, setFoundReservations] = useState([]);
    const [foundReservationError, setFoundReservationError] = useState(null);

    const handleSubmit = (event) => {
        const mobile_number = document.getElementById('mobile_number').value
        const abortController = new AbortController();
        event.preventDefault();
       
       async function callListReservation() {
           try{
                await listReservations({ mobile_number }, abortController.signal)
                    .then(setFoundReservations)
                    .then(console.log("Within Search Component",foundReservation))
                    .catch(setFoundReservationError);
                } catch (err) {
                    if (err.name === "AbortError") {
                        console.log("Aborted");
                    } else {
                        setFoundReservationError(err);
                        throw err;
                    };
                };
            };
            callListReservation();
    
            return () => {
                abortController.abort();
            }
        }

    const reservationDisplay = foundReservation.map((reservation) => DashboardReservationsView({...reservation}))
    const NotFound = (<b>Reservation not found!</b>)
    return (
        <>
        <div>
            <h2>Search for Reservation</h2>
        </div>
        <form>
        <input type="text" id='mobile_number' name="mobile_number" placeholder= "Enter a customer's phone number"/> 
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
        <ErrorAlert error={foundReservationError} />
        <div>
            <h6>
                {foundReservation? reservationDisplay : NotFound}
            </h6>
        </div>
        </>
        )
}