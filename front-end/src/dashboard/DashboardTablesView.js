import React from "react";

export default function DashboardReservationsView({tables}){
    const sortedTables = tables.sort();
    console.log(sortedTables)


    const displayTables = sortedTables.map((table) =>  {
        return (
    <tr >
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td >{table.capacity}</td>
        <td>{table.occupied? <p data-table-id-status={table.table_id}> Occupied </p>: <p data-table-id-status={table.table_id}> Free</p>}</td>
        <td>{table.reservation_id}</td> 
        <td>{table.occupied ===
                false ? null : (
                <>
                  <button

                    className="btn btn-outline-primary"
                  >
                    Finish
                  </button>
                  </>)}</td> 
    </tr>)})

    return (
        <>
            <div>
                <table className="table align-middle">
                <caption>Tables</caption>
                <thead>
                    <tr>
                    <th scope="col">ID #</th>
                    <th scope="col">Table Name</th>
                    <th scope="col">Table Capacity</th>
                    <th scope="col">Occupied?</th>
                    <th scope="col">Reservation ID#</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {displayTables}
                </tbody>
                </table>
            </div>
        </>
            
        )
    }