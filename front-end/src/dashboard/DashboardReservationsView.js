import React from "react";

export default function DashboardReservationsView({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status}){

        return (
        <fragment>
            <button onClick={}/>
            <p><b>Reservation ID:</b> {reservation_id} <b>Last Name: </b> {last_name} <b>First Name: </b> {first_name} <b>Mobile Number:</b> {mobile_number} <b>Date:</b> {reservation_date} <b>Time:</b> {reservation_time}</p>
        </fragment>
            
        )
    }