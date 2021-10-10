import React from "react";


export default function DashboardReservationsView({table_name, reservation_id, table_id, capacity, occupied}){

        return (
        <fragment>
            <p><b>Table Name:</b> {table_name} <b>Reservation ID:</b> {reservation_id} <b>Table ID: </b> {table_id} <b>Capacity: </b> {capacity} <b> Status:</b> {occupied}</p>
        </fragment>
            
        )
    }