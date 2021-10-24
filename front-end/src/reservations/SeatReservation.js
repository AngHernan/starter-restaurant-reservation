import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, updateTableStatus, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { validateSeating } from "../utils/validations";

export default function SeatReservation(){
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    
    const [currentReservation, setCurrentReservation] = useState({});
    const [currentReservationError, setCurrentReservationError] = useState(null);

    const [seatReservationError, setSeatReservationError] = useState(null);
    const [errors, setErrors] = useState({"messages":[]});
    const {reservation_id} = useParams();



    const [selectedTable, setSelectedTable] = useState(1);

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
            console.log(target.value,target)
            setSelectedTable(target.value);
          }

    const handleSubmit = (event) => {
        event.preventDefault();
        const found = tables.find((table) => table.table_id === 4)
        console.log("Seat reservation module:", tables, found)
        console.log("this is the seat we need", selectedTable)
        
        const validated = false;
        if(!validated){
            console.log(validated)
            console.log(errors.messages.join(' '))
            console.log(errors.messages)
            setErrors({...errors})
            return errors.messages;
        }
       
        const abortController = new AbortController();

        const id = { data: { reservation_id: reservation_id } }
        updateTableStatus(selectedTable, id, 'PUT', abortController.signal)
            .then(() => history.push(`/dashboard`))
            .catch(setSeatReservationError)
        return () => {
                abortController.abort();
            }
        }

    const tableOptions = tables.map((table) => {
        return  (<option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity} </option>)
    })

    const errorDisplay = `Resolve these issues: ${errors.messages.join(',\n ')} !`;

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
        {errors.messages.length? <div className="alert alert-danger" role="alert">
  {errorDisplay}</div>: <div></div>}
            <ErrorAlert error={seatReservationError} />
        <div className="row justify-content-center">
            
        <div className="col-4.5 m-2 p-3 border border-primary bg-dark text-white">
            <label for="table">Table Number : </label>
            <select name="table_id" onChange={handleChange} class="form-select form-select-lg mb-2" aria-label="table">
                {tableOptions}
            </select>
            
            </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-1 p-2 bg-dark text-white">
            <button type="submit" onClick={handleSubmit}  className="btn btn-outline-primary">Confirm</button>
            </div>
            <div className="col-1 p-2 bg-dark text-white">
            <button type="cancel" onClick={()=> history.goBack()}  className="btn btn-outline-danger mb-1">Cancel</button>
        </div>
        </div>
        </div>
    </fragment>
        )
}