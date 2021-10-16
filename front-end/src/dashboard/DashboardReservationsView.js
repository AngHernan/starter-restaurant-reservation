import React from "react";
//import {Link} from "react-router-dom";

export default function DashboardReservationsView({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status}){

    
        return (
        <>
            <tr>
                <th scope="row">{reservation_id}</th>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date}</td>
                <td>{reservation_time}</td>
                <td><a href={`/reservations/${reservation_id}/seat`} type="button" className="btn btn-primary">Seat</a></td>
            </tr>
        </>
            
        )
    }