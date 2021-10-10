import React, { useState} from "react";
import {Link} from "react-router-dom";
import {createTable} from "../utils/api";

export default function CreateTable(){
    const [newTable, setNewTable] = useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewTable({...newTable, [name]: value});

    }

    const handleSubmit = (event) => {
        const abortController = new AbortController();
        console.log("before submitting",newTable);
        event.preventDefault();
        async function callCreateTable(){
            try {
                const table = {
                    ...newTable,
                    capacity: Number(newTable.capacity),
                };
                await createTable({data: table}, abortController.signal);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.info('Aboorted');
                } else {
                    throw err;
                };
            };
        };
        callCreateTable();
    
        return () => {
            abortController.abort();
        };
    };
    
    return (
        <form>
            <div className="mb-3">
                <label for="table_name" className="form-label">Table Name:</label>
                <input type="text" className="form-control" name="table_name" id="table_name" placeholder="Table Name" value={newTable?.table_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label for="capacity" className="form-label">Capacity of Table:</label>
                <input type="number" min="1" pattern="\d+" className="form-control" name="capacity" id="capacity" placeholder='10' value={newTable?.capacity} onChange={handleChange}/>
            </div>
            <Link to={'/'} type="button" className="buttonSpace btn btn-secondary">Cancel</Link>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
}