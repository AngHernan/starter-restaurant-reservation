import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { listTables } from "../utils/api";
// seatReservation from "../utils/api"

export default function SeatReservation(){
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);

    useEffect(() => {
        async function loadTables(){
            const abortController = new AbortController();
            setTables(null);
            listTables(abortController.signal)
                .then(setTables)
                .catch(setTablesError)
            return () => abortController.abort();
        }
    }, [])

    const tableOptions = tables.map((table) => {
        return  (<option value={table.table_name}>{table.table_name} - {table.capacity}</option>)
    })
    return (
    <>
        <select name="table_id" >
            {tableOptions}
        </select>
    </>
        )
}