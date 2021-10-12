import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

// seatReservation from "../utils/api"

export default function SeatReservation(){
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);

    useEffect(loadTables, [])
    
    function loadTables(){
            const abortController = new AbortController();
            setTablesError(null);
            listTables(abortController.signal)
                .then(setTables)
                .then(console.log(tables))
                .catch(setTablesError)
            return () => abortController.abort();
            }

    const tableOptions = tables.map((table) => {
        return  (<option value={table.table_name}>{table.table_name} - {table.capacity}</option>)
    })

    return (
    <fragment> 
        <ErrorAlert error={tablesError} />
        <label for="tables">Which table?</label>
        <select id="tables" name="table_id">
        {tableOptions}
        </select>
    </fragment>
        )
}