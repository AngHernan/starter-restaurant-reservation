import React from "react";
//import {Link} from "react-router-dom";

export default function DashboardReservationsView({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status}){

        return (
        <fragment>
            <p><b>Reservation ID:</b> {reservation_id} <b>Last Name: </b> {last_name} <b>First Name: </b> {first_name} <b>Mobile Number:</b> {mobile_number} <b>Date:</b> {reservation_date} <b>Time:</b> {reservation_time}</p>
            <a href={`/reservations/${reservation_id}/seat`} type="button" className="btn btn-primary">Seat</a>
        </fragment>
            
        )
    }