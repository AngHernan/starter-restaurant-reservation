import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, updateTableStatus, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import {updateReservation} from "../utils/api"

export default function SeatReservation(){
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    
    const [currentReservation, setCurrentReservation] = useState({});
    const [currentReservationError, setCurrentReservationError] = useState(null);

    const [seatReservationError, setSeatReservationError] = useState(null);
    const {reservation_id} = useParams();

    const [selectedTable, setSelectedTable] = useState(null)
    useEffect(loadTables, []);
    useEffect(loadReservation, [reservation_id]);
    
    function loadTables(){
            const abortController = new AbortController();
            setTablesError(null);
            listTables(abortController.signal)
                .then(setTables)
                .catch(setTablesError)
            return () => abortController.abort();
            }

    function loadReservation(){
        const abortController = new AbortController();
        setCurrentReservationError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .catch(setCurrentReservationError)
        return () => abortController.abort();
        }

        async function handleChange({ target }) {
            console.log(target.value, target)
            setSelectedTable(target.value);
          }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('table:', selectedTable)
        const table_id = selectedTable
        const abortController = new AbortController();
        const status = {data: { status: "seated" } };
        const id = { data: { reservation_id: reservation_id } }
        updateTableStatus(table_id, id, 'PUT', abortController.signal)
            .then(() => history.replace(`/dashboard`))
            .catch(setSeatReservationError)
        return () => {
                abortController.abort();
            }
        }

    const tableOptions = tables.map((table) => {
        return  (<option value={table.table_id}>Table Name: {table.table_name} | Capacity: {table.capacity} | Status: {table.occupied? "Occupied": "Available"}</option>)
    })


    return (
    <fragment> 
        <div className="container p-3 my-2 bg-dark text-white">
            <div className="row m-5 justify-content-center">
            <div className="col-4.5  p-3 bg-dark text-white">
                <h1 className="m-3">Seat Reservation</h1>
            </div>
            </div>
        </div>

        <div className="container p-3 my-2 border border-primary bg-white text-white">
            <div className="row my-3 justify-content-center">
            <div className="col-5 align-self-center border border-primary p-3 bg-dark text-white">
                <div className="row justify-content-center"><h4>{currentReservation.first_name} {currentReservation.last_name}</h4></div>
                <div className="row justify-content-center"><h4>Party of {currentReservation.people}</h4></div>
            </div>
        </div>

        <div className="row my-3 justify-content-center">
            <div className="col-5 align-self-center border border-primary p-3 bg-dark text-white">
                <div className="row justify-content-center"><h4>Phone #: </h4></div>
                <div className="row justify-content-center"><h4>{currentReservation.mobile_number}</h4></div>
            </div>
         </div>

        
        <ErrorAlert error={currentReservationError} />
        
        </div>
        <div className="container p-3 my-2 bg-dark text-white">
        <div className="row mb-2 justify-content-center">
            <div className="col-2.5 p-3 bg-dark text-white">
                <h2>Select Table </h2>
            </div>
        </div>
        <ErrorAlert error={tablesError} />
            <ErrorAlert error={seatReservationError} />
        <div className="row justify-content-center">
            
        <div className="col-4.5 m-2 p-3 border border-primary bg-dark text-white">
            <label for="table"></label>
            <select name="table" id="table" onChange={handleChange} class="form-select form-select-lg mb-2" aria-label="table">
                {tableOptions}
            </select>
            
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-1 p-2 bg-dark text-white">
            <button type="submit" onClick={handleSubmit}  className="btn btn-outline-primary">Confirm</button>
        </div>
        </div>
        </div>
    </fragment>
        )
}