import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listTables, updateTableStatus, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import {updateReservation} from "../utils/api"

export default function SeatReservation(){
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    
    const [currentReservation, setCurrentReservation] = useState({});
    const [currentReservationError, setCurrentReservationError] = useState(null);

    const [seatReservationError, setSeatReservationError] = useState(null);
    const {reservation_id} = useParams();

    useEffect(loadTables, []);
    useEffect(loadReservation, []);
    
    function loadTables(){
            const abortController = new AbortController();
            setTablesError(null);
            listTables(abortController.signal)
                .then(setTables)
                .then(console.log(tables))
                .catch(setTablesError)
            return () => abortController.abort();
            }

    function loadReservation(){
        const abortController = new AbortController();
        setCurrentReservationError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setCurrentReservation)
            .then(console.log(currentReservation))
            .catch(setCurrentReservationError)
        return () => abortController.abort();
        }

    const handleSubmit = (event) =>{
        const table_id = document.getElementById('table').value
        const abortController = new AbortController();
        event.preventDefault();
        async function callUpdateReservation (){
            try{
                const status = {data: { status: "seated" } };
                const id = { data: { reservation_id: reservation_id } }
                await updateTableStatus(table_id, id, abortController.signal)
                await updateReservation(reservation_id, status, abortController.signal)
                
                } catch (err) {
                    if (err.name === "AbortError") {
                        console.info('Aboorted');
                        
                    } else {
                        setSeatReservationError(err);
                        throw err;
                    };
                };
            };
            callUpdateReservation();

            return () => {
                abortController.abort();
            }
        }

    const tableOptions = tables.map((table) => {
        return  (<option value={table.table_id}>Table Name: {table.table_name} | Capacity: {table.capacity} | Status: {table.occupied? "Occupied": "Available"}</option>)
    })

    console.log("hello:",tableOptions.value)


    return (
    <fragment> 
        <div> 
        <ErrorAlert error={currentReservationError} />
            <h4>Update Reservation for: {currentReservation.first_name}</h4>
            <h6>Party of: {currentReservation.people}</h6>
    </div>
        <ErrorAlert error={tablesError} />
        <label for="tables">Which table? </label>
        <select id="table" name="table_id">
            {tableOptions}
        </select>
        
        <button type="submit" onClick={handleSubmit}  className="btn btn-primary">Submit</button>
        <ErrorAlert error={seatReservationError} />
    </fragment>
        )
}